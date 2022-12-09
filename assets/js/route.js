// API Key for Mapbox
mapboxgl.accessToken =
  "pk.eyJ1Ijoic2Vhbi1tZWFkZSIsImEiOiJja3lmeDZkM3Iwc21hMm9xcG95YnFqaHh3In0.p4oU6PP7a92U1JYLBCLG2g";

// Initialize a map with the center being a view of Ireland
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-3.00742, 16.77348],
  zoom: 12,
}); // map variable

// Search field for choosing a location for the map to go to (i.e. geocoder)
const geocoder =
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    types: "country,region,place,postcode,locality,neighborhood,address,poi,poi.landmark",
  });
 
// Add the control to the map.
map.addControl(geocoder, 'top-left');

// Add full screen control
map.addControl(new mapboxgl.FullscreenControl());

class AddUseCurrentLocControl {
  onAdd(map) {
    this.map = map;
    this.container = document.createElement('input');
    this.container.id = 'use-current-location';
    this.container.type = 'button';
    this.container.className = 'mapboxgl-ctrl map-custom-controls';
    this.container.title = 'Start where I am now';
    return this.container;
  }
  onRemove() {
    this.container.parentNode.removeChild(this.container);
    this.map = undefined;
  }
}

map.addControl(new AddUseCurrentLocControl());

class AddUndoControl {
  onAdd(map) {
    this.map = map;
    this.container = document.createElement('input');
    this.container.id = 'undo';
    this.container.type = 'button';
    this.container.className = 'mapboxgl-ctrl map-custom-controls';
    this.container.title = 'Undo Click';
    return this.container;
  }
  onRemove() {
    this.container.parentNode.removeChild(this.container);
    this.map = undefined;
  }
}

map.addControl(new AddUndoControl());

const undo = document.getElementById('undo');

undo.setAttribute('disabled', '');

class AddLoopedRouteControl {
  onAdd(map) {
    this.map = map;
    this.container = document.createElement('input');
    this.container.id = 'looped-route';
    this.container.type = 'button';
    this.container.className = 'mapboxgl-ctrl map-custom-controls';
    this.container.title = 'Loop route back to the beginning';
    return this.container;
  }
  onRemove() {
    this.container.parentNode.removeChild(this.container);
    this.map = undefined;
  }
}

map.addControl(new AddLoopedRouteControl());

const loopedRoute = document.getElementById('looped-route');

loopedRoute.setAttribute('disabled', '');

class AddClearRouteControl {
  onAdd(map) {
    this.map = map;
    this.container = document.createElement('input');
    this.container.id = 'reset-route';
    this.container.type = 'button';
    this.container.className = 'mapboxgl-ctrl map-custom-controls';
    this.container.title = 'Clear Route';
    return this.container;
  }
  onRemove() {
    this.container.parentNode.removeChild(this.container);
    this.map = undefined;
  }
}

map.addControl(new AddClearRouteControl());

// Create geoJSON feature collection variables
// an empty place holder
let placeholder = turf.featureCollection([]);
// to track clicks to add markers to map
let markers = turf.featureCollection([]);
// A list to track clicks in the form of [long, lat] where long and lat are are floats with up 6 decimal places
let clickRoute = [];



// If location searched update map center
geocoder.on("result", (e) => {
  resetRoute();
  map.setCenter(e.result.center);
});

/**
 * Function that loads the map when the page is loading
 * Adds layers for starting point, markers (each click after starting point)
 * and the route to the map
 *
 */
map.on("load", function () {

    // Add an image to use as a custom marker
    map.loadImage(
      'assets/images/location.png',
      (error, image) => {
        if (error) throw error;
        map.addImage('custom-marker', image);

  // Layer for starting point
  map.addLayer({
    id: "starting-point",
    type: "symbol",
    source: {
      data: placeholder,
      type: "geojson",
    },
    'layout': {
      'icon-image': 'custom-marker'
    },
  });

  // Layer for markers
  map.addLayer({
    id: "route-points",
    type: "symbol",
    source: {
      data: markers,
      type: "geojson",
    },
    layout: {
      "icon-allow-overlap": false,
      "icon-ignore-placement": true,
      "icon-image": "marker-15",
    },
  });

  // The data that the route is drawn with
  map.addSource("route", {
    type: "geojson",
    data: placeholder,
  });

  // Layer for route line
  map.addLayer(
    {
      id: "routeline-active",
      type: "line",
      source: "route",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#3887be",
        "line-width": ["interpolate", ["linear"], ["zoom"], 12, 3, 22, 12],
      },
    },
    "waterway-label"
  );
      }
      );
});

/**
 * function called if useCurrentLocAsStart function fails to receive current location
 * creates alert informing user of error
 */
function errorCurrentLocation() {
  alert(
    "Couldn't find your current location",
    "warning",
    "noCurrentLocationAlert"
  );
}

/**
 * Creates starting marker
 *
 * @param {Array} start in the form of [long, lat] where long and lat are are floats with up 6 decimal places
 */
function createStartMarker(start) {
  map
    .getSource("starting-point")
    .setData(turf.featureCollection([turf.point(start)]));
}

/**
 * A function that when a click is made on map updates clickRoute with the click and updates number of markers left
 *
 * @param {Array} click in the form of [long, lat] where long and lat are are floats with up 6 decimal places
 */
function updateRoute(click) {
  clickRoute.push(click);
  document.getElementById("way-points").innerHTML = clickRoute.length;
}

/**
 * A function thats called if useCurrentLocAsStart is successful that checks to see if the input is an Array or a GeolocationPosition and sets the starting marker accordingly
 * if start point set by current location it'll set the center of the map to current location
 *
 * @param {Array} click in the form of [long, lat] where long and lat are are floats with up 6 decimal places
 * @param {GeolocationPosition} click containing data from navigator.geolocation.getCurrentPosition
 */
function setStartMarker(click) {
  if (click.coords == undefined) {
    createStartMarker(click);
  } else {
    let start = [
      parseFloat(click.coords.longitude.toFixed(6)),
      parseFloat(click.coords.latitude.toFixed(6)),
    ];
    updateRoute(start);
    createStartMarker(start);
    map.setCenter(start);
  }
}

/**
 * Function called when Start Where I am button is clicked
 * Resets the route first and then sets starting marker if successful else
 * serves users with alert through errorCurrentLocation
 */
document.getElementById("use-current-location").onclick = function () {
  resetRoute();
  document.getElementById("undo").disabled = false;
  navigator.geolocation.getCurrentPosition(
    setStartMarker,
    errorCurrentLocation,
    {
      enableHighAccuracy: true,
    }
  );
};

/**
 * function that updates the route-points layer to add a maker to map
 *
 * @param {turf featureCollection} markers Takes one or more Feature|Features and creates a FeatureCollection
 */
function addMarker(markers) {
  map.getSource("route-points").setData(markers);
}

/**
 * function thats called when looped route checkbox is clicked
 * if the first and last value is the same in clickRoute and looped route in unchecked remove the looped route
 * else loop the route by adding first maker value to the end of clickRoute
 *
 */
document.getElementById("looped-route").onclick = function () {
  if (
    clickRoute[0] == clickRoute[clickRoute.length - 1] &&
    document.getElementById("looped-route").checked == false
  ) {
    clickRoute.pop();
  } else {
    clickRoute.push(clickRoute[0]);
  }

  // Create the route with updated clickRoute
  createRoute(clickRoute);
};

/**
 * Function called by clicking Undo button
 *
 * removes a marker and creates route
 * if only starting point remains resets route
 * Updates looped route checkbox accordingly
 *
 */
document.getElementById("undo").onclick = function () {
  if (clickRoute.length > 1) {
    if (clickRoute.length == 2) {
      clickRoute.pop();
      map.getSource("route").setData(placeholder);
      document.getElementById("distance").innerHTML = "0";
      document.getElementById("looped-route").disabled = true;
    } else {
      clickRoute.pop();
      createRoute(clickRoute);
    }
    markers.features.pop();
    addMarker(markers);
    document.getElementById("way-points").innerHTML = clickRoute.length;
  } else {
    resetRoute();
  }

  if (
    clickRoute[0] == clickRoute[clickRoute.length - 1] &&
    clickRoute.length > 1
  ) {
    document.getElementById("looped-route").checked = true;
  } else {
    document.getElementById("looped-route").checked = false;
  }
};

/**
 * Function that resets the map, it:
 *
 * Unchecks and disables looped route checkbox
 * Empties clickRoute and markers
 * Removes starting point, route and markers from the map
 * updates the distance and way points
 * disables the undo button
 *
 */
function resetRoute() {
  document.getElementById("looped-route").checked = false;
  document.getElementById("looped-route").disabled = true;

  clickRoute = [];
  markers = turf.featureCollection([]);

  map.getSource("starting-point").setData(placeholder);
  map.getSource("route").setData(markers);
  addMarker(markers);

  document.getElementById("distance").innerHTML = "0";
  document.getElementById("way-points").innerHTML = "0";
  document.getElementById("undo").disabled = true;
}

/**
 * Function called when Reset Route button is clicked
 */
document.getElementById("reset-route").onclick = function () {
  resetRoute();
};

/**
 * function that creates a route with an array of lat, long values by making a request to the mapbox directions api
 * clickRoute = [[long1, lat1], [long2, lat2], ... [longn, latn]]
 * where n is up to 24
 * and latn and longn are floats with up 6 decimal places (e.g. [-7.266155, 53.750145])
 *
 * @param {Array} clickRoute an array containing arrays with two entries latitude and longitude
 */
async function createRoute(clickRoute) {
  // create url to make request with route and API key
  let url =
    "https://api.mapbox.com/directions/v5/mapbox/walking/" +
    clickRoute.join(";") +
    "?geometries=geojson&access_token=" +
    mapboxgl.accessToken;

  // Call a GET request to Mapbox directions API and receive data back
  // get the route coordinates and create a GeoJSON feature called routeGeoJSON to hold the route
  // get distance of route from the data
  // display route on the map and distance to html
  $.ajax({
    method: "GET",
    url: url,
  })
    .done(function (data) {
      let route = data.routes[0].geometry.coordinates;
      let routeGeoJSON = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: route,
        },
      };
      map.getSource("route").setData(routeGeoJSON);

      let distance = data.routes[0].distance / 1000;
      document.getElementById("distance").innerHTML =
        distance.toFixed(2) + "km";
    })
    .fail(function () {
      // throw error if request fails
      alert(
        "Request for route information failed please contact creator of site",
        "danger",
        "map-alerts"
      );
    });
}

// --------------------- Entry Point ---------------------

// When map is clicked collect lat and lng and update map accordingly
/**
 * Function that is called when the map is clicked.
 *
 *
 * @param {click Interaction} e click Interaction fired when a pointing device is pressed and released at the same point on the map
 *                              link to example: https://docs.mapbox.com/mapbox-gl-js/api/map/#map.event:click
 */
map.on("click", function (e) {
  // enable undo button on map when first marker is set
  document.getElementById("undo").disabled = false;

  // Collect lat and long values from click and set as an array
  let coords = e.lngLat;
  let click = [
    parseFloat(coords.lng.toFixed(6)),
    parseFloat(coords.lat.toFixed(6)),
  ];

  if (clickRoute[0] == clickRoute[clickRoute.length - 1]) {
    document.getElementById("looped-route").checked = false;
  }

  // if there are two markers in route enable the looped route check box
  if (clickRoute.length > 0) {
    document.getElementById("looped-route").disabled = false;
  }

  // if the limit of 24 clicks hasn't been met
  if (clickRoute.length < 24) {
    // Add click to route
    updateRoute(click);

    // set the click as a geoJSON feature to add to markers
    let pt = turf.point([click[0], click[1]], {
      orderTime: Date.now(),
      key: Math.random(),
    });

    // if it's the first click add layer to first click else add marker and create route
    if (clickRoute.length == 1) {
      setStartMarker(click);
    } else {
      markers.features.push(pt);
      addMarker(markers);
      createRoute(clickRoute);
    }
  } else {
    // throw error saying reached limit of clicks
    alert("Reached limit of way points", "warning", "map-alerts");
  }
}); // map on click
