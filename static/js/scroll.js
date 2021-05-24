

document.documentElement.dataset.bubbles = false;

document.addEventListener("scroll", () => {
  document.documentElement.dataset.scroll = window.scrollY;
  document.documentElement.dataset.bubbles = (window.scrollY > 400);
});

var wave_interval = 400;
var counter = 0;

while(1){
    counter += 1;
    if (counter > wave_interval){
        // 25% chance of activating animation
        Math.floor(Math.random() * 3); 
    }
}

