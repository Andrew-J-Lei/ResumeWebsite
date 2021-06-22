// import anime from 'animejs/lib/anime.es.js';

var curr_ints;
const num_ints = 3;

// AJAX for Interests home page
function changeInterests(int_num) {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    document.getElementById("int_ch_content").innerHTML = this.responseText;
  }
  xhttp.open("GET", "interests_"+int_num+".html");
  xhttp.send();
  var targ_butt = document.getElementById('ints_'+int_num+'_butt');
  targ_butt.classList.remove("unsel_butt");
  targ_butt.classList.add("sel_butt");
  for (var i=1; i <= num_ints; i++){
    if (i != int_num){
      targ_butt = document.getElementById("ints_"+i+"_butt");
      if (targ_butt.classList.contains("sel_butt")){
        targ_butt.classList.add("unsel_butt");
        targ_butt.classList.remove("sel_butt");
      }
    } 
  }
}

function decrementInterests() {
  curr_ints -= 1;
  if (curr_ints < 1)
    curr_ints = num_ints;
  changeInterests(curr_ints);
}

function incrementInterests() {
  curr_ints += 1;
  if (curr_ints > 3)
    curr_ints = 1;
  changeInterests(curr_ints);
}

function onload_homepage(){
  curr_ints = 1;
  changeInterests(curr_ints);
  document.getElementById("wind_1a_path").style.display = "none";
  document.getElementById("wind_1b_path").style.display = "none";
  console.log("Finished loading homepage")
}

// For bubble effect on home page
document.documentElement.dataset.bubbles = false;
document.addEventListener("scroll", () => {
  document.documentElement.dataset.scroll = window.scrollY;
  document.documentElement.dataset.bubbles = (window.scrollY > 400);
});

// Animation effects
// requirejs(["helper/util"], function(util) {
//     //This function is called when scripts/helper/util.js is loaded.
//     //If util.js calls define(), then this function is not fired until
//     //util's dependencies have loaded, and the util argument will hold
//     //the module value for "helper/util".
// });

// const anime = require('animejs');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function wind_1(){
  // Returns 0 - max
  var max = 1;
  var rand = Math.floor(Math.random() * max);
  console.log("Deciding");
  if (rand == 0){
    console.log("Showing wind_1")
    document.getElementById("wind_1a_path").style.display = "block";
    document.getElementById("wind_1b_path").style.display = "block";
    console.log("Animating wind_1")
    var duration = 3000;
    anime({
      targets: '.wind_1',
      strokeDashoffset: [anime.setDashoffset + 200, -600],
      easing: 'easeInOutSine',
      duration: duration,
      delay: function(el, i) { return i * 100 },
      direction: 'normal',
      loop: false
    })
    await sleep(duration+50);
    document.getElementById("wind_1a_path").style.display = "none";
    document.getElementById("wind_1b_path").style.display = "none";
  }
  await sleep(2000);
  wind_1();
}


onload_homepage();
// var loc = window.location.pathname;
// var dir = loc.substring(0, loc.lastIndexOf('/'));
// console.log(dir)
const wind1 = wind_1();