

document.documentElement.dataset.bubbles = false;

document.addEventListener("scroll", () => {
  document.documentElement.dataset.scroll = window.scrollY;
  document.documentElement.dataset.bubbles = (window.scrollY > 400);
});

var wave_interval = 400;
var counter = 0;

