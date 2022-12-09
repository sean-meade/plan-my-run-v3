// blurring function is adapted from: https://www.udemy.com/course/50-projects-50-days/

// Set variables for blur function
let loadText = document.querySelector(".loading-text");
let bg = document.querySelector(".bg");
let load = 0;
let int = setInterval(blurring, 15);

/**
 * A function that blurs the background image and increments the loading percentage
 * evenly with each other, and on completion sets them both to display none
 */
function blurring() {
  load++;

  if (load > 99) {
    clearInterval(int);
    loadText.style.display = "none";
    bg.style.display = "none";
    document.body.style.overflow = "visible";
  }

  loadText.innerText = `${load}%`;
  loadText.style.opacity = 1 - load / 100;
  bg.style.filter = `blur(${Math.round(load / 3)}px)`;
}

// https://www.designcise.com/web/tutorial/how-to-force-scroll-to-the-top-of-the-page-on-page-reload-using-javascript
// if else statement that on reload of the page the page is scrolled to the top
// this is so the loading screen is in full view
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
} else {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };
}
