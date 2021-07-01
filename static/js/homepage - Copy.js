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
  // Hide all svgs
  var wind_paths = document.getElementsByClassName("wind_path");
  for (let i=0; i < wind_paths.length; i++)
    {
      wind_paths[i].style.display = "none"
    }
  console.log("Finished loading homepage")
}

// For bubble effect on home page
document.documentElement.dataset.bubbles = false;
document.addEventListener("scroll", () => {
  document.documentElement.dataset.scroll = window.scrollY;
  document.documentElement.dataset.bubbles = (window.scrollY > 400);
});


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function wind(chance, min_time_int, max_time_int){
  // Returns 0 - max
  var activation = Math.floor(Math.random() * chance);
  console.log("Deciding wind_1")
  var wind_1_freq = 2;
  if (activation <= wind_1_freq){
    console.log("Showing wind_1")
    document.getElementsByClassName("wind_1")[0].style.display = "block";
    console.log("Animating wind_1")
    var duration = 3000;
    anime({
      targets: '.wind_1',
      strokeDashoffset: [anime.setDashoffset + 200, -600],
      easing: 'easeInOutSine',
      duration: duration,
      direction: 'normal',
      loop: false
    })
    await sleep(duration+50);
    document.getElementsByClassName("wind_1")[0].style.display = "none";
  }
  activation = Math.floor(Math.random() * chance);
  var wind_2_freq = 2;
  console.log("Deciding wind_2")
  if (activation <= wind_2_freq){
    console.log("Showing wind_2")
    document.getElementsByClassName("wind_2")[0].style.display = "block";
    console.log("Animating wind_2")
    var duration = 3000;
    anime({
      targets: '.wind_2',
      strokeDashoffset: [anime.setDashoffset + 200, -600],
      easing: 'easeInOutSine',
      duration: duration,
      direction: 'normal',
      loop: false
    })
    // await sleep(duration+50);
    document.getElementsByClassName("wind_2")[0].style.display = "none";
  }
  // activation = Math.floor(Math.random() * chance);
  // var wind_3_freq = 2;
  // console.log("Deciding wind_3")
  // if (activation <= wind_3_freq){
  //   console.log("Showing wind_3")
  //   document.getElementsByClassName("wind_3")[0].style.display = "block";
  //   console.log("Animating wind_3")
  //   var duration = 3000;
  //   anime({
  //     targets: '.wind_3',
  //     strokeDashoffset: [anime.setDashoffset + 200, -600],
  //     easing: 'easeInOutSine',
  //     duration: duration,
  //     direction: 'normal',
  //     loop: false
  //   })
  //   // await sleep(duration+50);
  //   document.getElementsByClassName("wind_3")[0].style.display = "none";
  // }
  // activation = Math.floor(Math.random() * chance);
  // var wind_4_freq = 2;
  // console.log("Deciding wind_4")
  // if (activation <= wind_4_freq){
  //   console.log("Showing wind_4")
  //   document.getElementsByClassName("wind_4")[0].style.display = "block";
  //   console.log("Animating wind_4")
  //   var duration = 3000;
  //   anime({
  //     targets: '.wind_4',
  //     strokeDashoffset: [anime.setDashoffset + 200, -600],
  //     easing: 'easeInOutSine',
  //     duration: duration,
  //     direction: 'normal',
  //     loop: false
  //   })
  //   // await sleep(duration+50);
  //   document.getElementsByClassName("wind_4")[0].style.display = "none";
  // }
  // activation = Math.floor(Math.random() * chance);
  // console.log("Deciding wind_5")
  // var wind_5_freq = 2;
  // if (activation <= wind_5_freq){
  //   console.log("Showing wind_5")
  //   document.getElementsByClassName("wind_5")[0].style.display = "block";
  //   console.log("Animating wind_5")
  //   var duration = 3000;
  //   anime({
  //     targets: '.wind_5',
  //     strokeDashoffset: [anime.setDashoffset + 200, -600],
  //     easing: 'easeInOutSine',
  //     duration: duration,
  //     direction: 'normal',
  //     loop: false
  //   })
  //   // await sleep(duration+50);
  //   document.getElementsByClassName("wind_5")[0].style.display = "none";
  // }
  var sleep_time = 500 * Math.floor(Math.random() * (max_time_int-min_time_int) + min_time_int);
  await sleep(sleep_time);
  wind(chance, min_time_int, max_time_int);
}


onload_homepage();
// var loc = window.location.pathname;
// var dir = loc.substring(0, loc.lastIndexOf('/'));
// console.log(dir)
var chance = 3;
var min_time_int = 1;
var max_time_int = 2;
const wind1 = wind(chance, min_time_int, max_time_int);