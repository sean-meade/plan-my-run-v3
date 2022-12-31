# Plan My Run

[Plan My Run](https://sean-meade.github.io/plan-my-run-v3/) is a website which allows runners to plan a run. It gives them the ability to choose a starting location, time, day, and then to map out their route with mouse clicks or finger taps. The running will receive weather information for the time and day, and a distance update on each click of the route they are planning.  

The longer the run the more difficult it gets. You have to make sure you plan your route so you run long enough distances to continue to progress. You can run the same shorter distance multiple times to make it up but speaking from experience this will drive you crazy. It is important to know how far you must run before going out and to make those runs as diverse as possible.

### Project Goals

The main goal of this project is to provide an app that helps runners plan their run. I am achieving this by providing a way for runners to map out potential routes which provides a feedback on distance. Also by adding the ability to get weather information for location, day and time.

### Site Owner Goals

- Provide the users with a helpful web application.
- Take the hassle out of finding a running route with the right distance.
- Provide weather information to inform gear choice.

### Site Visitor/User Goals

- Ability to choose what location to start the run in.
- Ability to choose the day and time for a run and with the location receive weather information.
- Ability to use the mouse to map out a running route and receive the distance of the route in return.

### User Stories

**Applies to all site users:**

- As a user, I am able to quickly understand how to navigate the site.
- As a user, I am able to choose what location to start the run in.
- As a user, I am able to change the location when I want.
- As a user, I am able to choose the day and time for a run and with location receive weather information
- As a user, I am able to change the day and time and update the weather information.
- As a user, I am able to use the mouse to map out a running route and receive the distance of the route in return.
- As a user, I am able to undo points of my route and the distance and map updates accordingly.
- As a user, I am able to make my run a looped run (returns back to where I started) and the distance and map updates accordingly.
- As a user, I am able to reset the map at any point and start fresh.
- As a user, I am able to find information or a link to the creator of the site.


**Applies to new site users:**

- As a user, I am able to understand how to use it without instruction.

**Applies to all returning users:**

- As a user, I am able to understand any changes that are made and use the site with no hinderance.

### User Requirements and Expectations

#### **Requirements**

- Visually pleasant app design
- Easy site navigation
- Information of the content layed out in a simple and clear way on both mobile and larger screens
- Self-explanatory icons where text is absent

#### **Expectations**

- Quick app load time
- Easy to use "out of the box" with minimal explanation.


## Information Architecture

This is a one page application and as such the information architecture follows most important to least important information according to the intended user. The information is displayed in this order:

1. The title text: this text explains simply what the site does and how it can help the user. This is the most important because it's important for a visitor to understand the purpose of the site on first visit.

2. How to choose the starting point: The user has the choice of choosing the general location and then clicking the start point on the map or using there current location. This is second most important as it is the beginning point for finding a running route.

3. The map: The map along with the text following it is the next most important because it gives the user the information to start building their route with clicks on a map.

4. Functional buttons for the map: After clicking on the map the functional buttons allow more control over building a route. They can loop their route automatically as a lot of runners start and finish their route at the same point (but not all). The undo button allows the user to remove a click and keep the rest of their route intact. The reset route button allows the user to clear everything from the map and start again.

5. The map output: Once the route is made and the user is happy with it they can view the distance of that route and how many waypoints they have left to add to they route if need be.

6. Weather input: The weather is a nice to have when planning a run and so comes close to the end. The user can input the day and time of their run (limited to four days).

7. Weather output: Once the day and time of a run is chosen the user can click Get Weather Info button and receive the relevant weather information in return.

8. Creator information: Lastly if the user is curious as to who created it there is a link to his GitHub account at the bottom of the page in the footer.

## Technologies

### Languages

- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

### Libraries & Frameworks

- [jQuery](https://jquery.com/)
- [Google fonts](https://fonts.google.com/)
- [Font-Awesome](https://fontawesome.com/icons?d=gallery)
- [Turf](https://unpkg.com/browse/@turf/turf@6.3.0/)
- [Bootstrap](https://getbootstrap.com/)

### APIs

- [Weather API](https://www.weatherapi.com/)
- [Mapbox API](https://docs.mapbox.com/api/overview/)

### Tools

- [Git](https://git-scm.com/)
- [GitHub](https://github.com/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Favicons](https://fontawesome.com/)
- [Iconfinder](https://www.iconfinder.com/icons/316043/raindrop_icon)


## Future Features:
- Some Features I would like to add in the future include: 
    - I'd love to get a more comprehensive weather API and do more then 4 days of weather.
    - A buffer for when the weather information is loading.
    - Improve performance on mobile maybe by using local versions of the imported js and striping it back to what I need.

## Deployment

The site was deployed to GitHub pages. The steps to deploy are as follows:
1.	In the repository navigate to the settings tab.
2.	Select Pages from the navigation on the left hand side.
3.	Select main (sometimes called master) branch, the root (meaning the root directory of your repo) and then save.
You will then be presented with a link to your hosted repository located right above the Source settings you just saved.