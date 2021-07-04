// Functions and variables ------------------------------------------------------------------------

var subcontent_dict = {'num_ints':3, 'curr_ints':1, 'num_phils':1, 'curr_phils':1}

// AJAX for Interests home page
function change_subcontent(type, sub_num) {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    document.getElementById(type+"_ch_content").innerHTML = this.responseText;
  }
  xhttp.open("GET", type+'_'+sub_num+".html");
  xhttp.send();
  var targ_butt = document.getElementById(type+'_'+sub_num+'_butt');
  targ_butt.classList.remove("unsel_butt");
  targ_butt.classList.add("sel_butt");
  for (let i=1; i <= subcontent_dict['num_'+type]; i++){
    if (i != sub_num){
      targ_butt = document.getElementById(type+"_"+i+"_butt");
      if (targ_butt.classList.contains("sel_butt")){
        targ_butt.classList.add("unsel_butt");
        targ_butt.classList.remove("sel_butt");
      }
    } 
  }
}

function decrement_subcontent(type) {
  subcontent_dict['curr_'+type] -= 1;
  if (subcontent_dict['curr_'+type] < 1)
    subcontent_dict['curr_'+type] = subcontent_dict['num_'+type];
  change_subcontent(type,subcontent_dict['curr_'+type]);
}

function increment_subcontent(type) {
  subcontent_dict['curr_'+type] += 1;
  if (subcontent_dict['curr_'+type] > subcontent_dict['num_'+type])
    subcontent_dict['curr_'+type] = 1;
  change_subcontent(type,subcontent_dict['curr_'+type]);
}

function onload_homepage(){
  curr_ints = 1;
  change_subcontent('ints',curr_ints);
  // Hide all svgs
  var wind_paths = document.getElementsByClassName("wind_path");
  for (let i=0; i < wind_paths.length; i++)
  {
    wind_paths[i].style.display = "none";
  }
  var wave_apps = document.getElementsByClassName("wave_appearance");
  for (let i=0; i < wave_apps.length; i++)
  {
    wave_apps[i].style.display = "none";
  }
  console.log("Finished loading homepage")
}

async function animate_bubbles(){
  var bubble_el = document.getElementById("bubbles");
  bubble_el.style.display="block";
  var bubble_frames = 16;
  for (let i=1; i <= bubble_frames; i++){
    var img_src = "https://andrewleiwebresources.blob.core.windows.net/website-resources/bubbles_"+i+".png"
    bubble_el.setAttribute("src", img_src)
    await sleep(120);
  }
  bubble_el.style.display="none";
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var act_winds = [false,false,false,false,false];

async function wind(i, duration, easing, offset1, offset2){
  act_winds[i] = true;
  // console.log("Showing wind_"+i);
  document.getElementsByClassName("wind_"+i)[0].style.display = "inline-block";
  // console.log("Animating wind_"+i);
  var duration = 3000;
  anime({
    targets: '.wind_'+i,
    strokeDashoffset: [anime.setDashoffset+offset1, offset2],
    easing: easing,
    duration: duration,
    direction: 'normal',
    loop: false
  });
  await sleep(duration+50);
  document.getElementsByClassName("wind_"+i)[0].style.display = "none";
  act_winds[i] = false;
}

async function wind_all(chance, sleep_time) {
  // Returns 0 - max
  const wind_freqs = [5,3,2,6,2];
  const offset_1s = [0,0,0,0,0];
  const offset_2s = [0,-1600, -1800,-1800,-2000];
  for (let i=0; i < wind_freqs.length; i++) {
    var activation = Math.floor(Math.random() * chance);
    // console.log("Deciding wind_"+i);
    if (activation <= wind_freqs[i] && !act_winds[i]){
      wind(i, 3000, 'linear', offset_1s[i], offset_2s[i]);
    }
  }
  await sleep(sleep_time);
  wind_all(chance, sleep_time);
}


var wave_active = [false, false, false, false, false, false];
// Wave has semi random position and duration
async function wave_rand(i){
  wave_active[i] = true;
  var this_wave = document.getElementsByClassName("wave_appearance")[i];
  this_wave.style.display = "block";
  // Semi Random Position (Has to appear within wavy area)
  var max_y = 150;
  var min_y = 0;
  this_wave.style.top = Math.floor(Math.random() * (max_y - min_y) + min_y);
  var max_x = 800;
  var min_x = 100;
  this_wave.style.marginLeft = Math.floor(Math.random() * (max_x - min_x) + min_x);
  // Semi Random Duration
  var max_duration = 2;
  var min_duration = 3;
  var duration = 1000 * Math.floor(Math.random() * (max_duration - min_duration) + min_duration);
  // Animation
  // console.log("Animating wave_"+i)
  var wave_path = document.getElementsByClassName("wave_path")[i];
  await animate(wave_path, wave_frames, duration);
  document.getElementsByClassName("wave_appearance")[i].style.display = "none";
  wave_active[i] = false;
}


var wave_frames =  ["M0.2,59.7c3.8,0,2.3,0,2.3,0c13.2,0,9.2-0.1,12.1,0c5,0.2,10.3-0.6,21.4,0 c9.7,0.5,183.8-0.2,189.3-0.9", 
"M0.2,59.7c3.8,0,2.3,0,2.3,0c7.8-4.4,8.7-5,11.5-5.5c4.9-0.9,6.8-0.7,18.5,3.3 c9.2,3.1,187.3,2.1,192.8,1.3", 
"M0.2,59.7c3.8,0,6.5-0.5,9.6-2.2c7.8-4.4,6.4-6.6,9-8c4.3-2.3,4.5,0.1,16.9,7 c8.5,4.8,184.1,3.9,189.6,3.2", 
"M0.2,59.7c3.8,0,10-0.5,13-2.2c7.8-4.4,9.2-12.2,12.5-14.3c3.9-2.4,1.8,5.6,14.1,12.5 c8.5,4.8,179.9,2.7,185.4,1.9", 
"M0.2,59.7c3.8,0,13.5,0,16.5-1.7c7.8-4.4,11.2-16.7,14.5-18.8c3.9-2.4,1.4,8.3,13.8,15.3 c8.5,4.8,174.8,3.9,180.3,3.2", 
"M0.2,60.8c3.8,0,18.2-1.3,21.3-3.1C29.2,53.3,32.9,37,36.2,35c3.9-2.4,0.3,11.9,12.7,18.8 c8.5,4.8,170.8,5.8,176.3,5", 
"M0.2,60.8c3.8,0,23.2-1.8,26.3-3.6c7.8-4.4,12.9-25.6,16.3-27.6c3.9-2.4,6.9,14,19.2,20.9 c8.5,4.8,157.8,9.1,163.3,8.3", 
"M0.2,60.8c3.8,0,25.9-5.5,34-8c8.6-2.7,11.4-39.7,19.7-37.3c11.5,3.3,6.1,24.4,18.5,31.3 c8.5,4.8,147.3,12.8,152.8,12.1", 
"M0.2,60.8C3,62,30.1,59.4,41.9,52.5c7.7-4.5,13-46.9,21-43.7c9.2,3.8,9.6,29.4,22,36.3 c8.5,4.8,134.8,14.5,140.3,13.7", 
"M0.2,60.8C3,62,39.1,56.1,50.9,49.2C58.7,44.7,72.7,8.6,76.2,5c6.9-7.2,0.4,35.9,12.8,42.8 c8.5,4.8,130.8,11.8,136.3,11", 
"M0.2,60.8c2.8,1.1,48.4-6.1,60.3-13c7.7-4.5,6.2-37.9,34-45c35.2-9.1-32.6,10.2-1.8,44.3 c6.5,7.2,127,12.6,132.5,11.8", 
"M0.2,60.8c2.8,1.1,61.7-0.4,67-13C77.4,23.1,86.3-0.1,101.4,6.2C143,23.7,68.4-7.3,95.8,45.1 c4.5,8.6,123.9,14.5,129.4,13.7", 
"M0.2,60.8c2.8,1.1,66.7-0.4,72-13c10.3-24.7,26.1-41.9,41.3-35.4c36.4,15.8-31.4-9.1-12.8,32.7 c4.1,9.2,118.7,15.1,124.5,13.7", 
"M0.2,60.8C3,62,74.3,57.5,82.5,46.5c12.9-17.2,31.2-17.3,38.8-15.8c41.3,8.2-19.3,6.5-14.1,18.6 c3.8,9,112.5,10.3,118,9.5", 
"M0.2,60.8C3,62,77,56.9,88.8,49.9C112,36,125.5,37,137.6,37.8c25.3,1.7-21.1,5-17.4,13.6 c3.9,8.9,99.5,8.2,105,7.4", 
"M0.2,60.8C3,62,82.4,58.7,93.9,51.2c18.5-12,42.5-11.4,51.2-6.7c9.7,5.3-12.4-0.5-8.7,8.1 c3.9,8.9,83.3,6.9,88.8,6.2", 
"M0.2,60.8C3,62,84.9,58.4,97.3,52.7c17.8-8.2,46.9-8,56-4.1c8.8,3.7-5.3-0.3-1,7.5 c4.7,8.5,67.4,3.4,72.9,2.7", 
"M0.2,60.8C3,62,97.1,57.2,109.5,51.5c17.8-8.2,45-2.3,54.1,1.6c8.8,3.7,2.8,3.3,12.8,3.4 c9.7,0.1,43.3,3.1,48.8,2.3", 
"M0.2,60.8c2.8,1.1,113-0.2,125.4-5.9c17.8-8.2,36.5-5.3,46.1-2.6c10.4,2.9,11.3,4,22.4,5.3 c9.7,1.2,25.7,2,31.2,1.3", 
"M0.2,60.8C3,62,131.4,56.3,145.1,56.3c21.4,0,28.5-3.3,38-0.7c10.4,2.9,9.4,1.7,20.5,3.1 c9.7,1.2,16,0.9,21.5,0.1", 
"M0.2,60.8c2.8,1.1,140.6,0,154.3,0c21.4,0,28-1.3,37.9-1.3c12.6,0,9.6-1,11.3-0.8 c7.6,0.7,16,1.9,21.5,1.2", 
"M0.2,60.8c2.8,1.1,140.6,0,154.3,0c21.4,0,28-0.6,37.9,0c7.9,0.5,9.8-0.2,11.6,0 c7.6,0.7,15.7,0.8,21.2,0", 
]


async function animate (element, frames, duration){
  // console.log(element);
  var frame_len = duration / frames.length;
  element.style.display = "inline-block";
  // console.log(element);
  for (let i = 0; i < frames.length; i ++){
    element.setAttribute('d', frames[i]);
    await sleep(frame_len);
  }
  element.style.display = "none";
}

async function wave_all(chance, sleep_time) {
  // Returns 0 - max
  var num_waves = 6;
  var wave_freq = 1;
  for (let i=0; i < num_waves; i++) {
    var activation = Math.floor(Math.random() * chance);
    // console.log("Deciding wind_"+i);
    if (activation <= wave_freq && !wave_active[i]){
      wave_rand(i);
    }
  }
  await sleep(sleep_time);
  wave_all(chance, sleep_time);
}



// Actual Script ----------------------------------------------------------------------------------

// For bubble effect on home page
// document.documentElement.dataset.bubbles = false;
var bubbles_activated = false;
document.addEventListener("scroll", () => {
  var bubble_thresh = 200;
  // document.documentElement.dataset.scroll = window.scrollY;
  // document.documentElement.dataset.bubbles = (window.scrollY > 400);
  console.log("Listening for events")
  // if ((document.documentElement.dataset.bubbles == false) & (document.documentElement.dataset.scroll >= bubble_thresh)){
  // console.log(bubbles_activated && window.scrollY > bubble_thresh);
  if (!bubbles_activated && window.scrollY >= bubble_thresh){
    bubbles_activated = true;
    console.log("True bubbles");
    animate_bubbles();
  }
});


onload_homepage();
// var loc = window.location.pathname;
// var dir = loc.substring(0, loc.lastIndexOf('/'));
// console.log(dir)
var wind_chance = 40;
var wind_sleep_time = 100;
const wind1 = wind_all(wind_chance, wind_sleep_time);

var wave_chance = 100;
var wave_sleep_time = 100;
const wave1 = wave_all(wave_chance, wave_sleep_time);

