// import anime from 'animejs/lib/anime.es.js';

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

// For bubble effect on home page
document.documentElement.dataset.bubbles = false;
document.addEventListener("scroll", () => {
  document.documentElement.dataset.scroll = window.scrollY;
  document.documentElement.dataset.bubbles = (window.scrollY > 400);
});


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



// console.log("Going to animate wave_app_0")
// anime({
//   targets: '.wave_app_0 .wave_appearance',
//   points: [
//     { value: [
//       '70 24 119.574 60.369 100.145 117.631 50.855 101.631 3.426 54.369',
//       '70 41 118.574 59.369 111.145 132.631 60.855 84.631 20.426 60.369']
//     },
//     { value: '70 6 119.574 60.369 100.145 117.631 39.855 117.631 55.426 68.369' },
//     { value: '70 57 136.574 54.369 89.145 100.631 28.855 132.631 38.426 64.369' },
//     { value: '70 24 119.574 60.369 100.145 117.631 50.855 101.631 3.426 54.369' }
//   ],
//   easing: 'easeOutQuad',
//   duration: 2000,
//   loop: true
// });



      // 'M0.4,39.9c2.5,0,1.5,0,1.5,0c8.8,0,6.1-0.1,8.1,0c3.3,0.1,6.9-0.4,14.2,0 c6.5,0.3,122.5-0.1,126.2-0.6Z M0.4,39.9c2.5,0,1.5,0,1.5,0c5.2-3,5.8-3.3,7.7-3.7c3.3-0.6,4.6-0.4,12.3,2.2 c6.1,2.1,124.8,1.4,128.5,0.9Z;      M0.4,39.9c2.5,0,4.3-0.3,6.4-1.5c5.2-3,4.3-4.4,6-5.3c2.9-1.5,3,0.1,11.2,4.7 c5.7,3.2,122.7,2.6,126.4,2.1Z;      M0.4,39.9c2.5,0,6.6-0.3,8.7-1.5c5.2-3,6.1-8.2,8.3-9.5c2.6-1.6,1.2,3.7,9.4,8.4 c5.7,3.2,119.9,1.8,123.6,1.3Z;      M0.4,39.9c2.5,0,9,0,11-1.1c5.2-3,7.5-11.2,9.7-12.5c2.6-1.6,0.9,5.6,9.2,10.2 c5.7,3.2,116.5,2.6,120.2,2.1Z;      M0.4,40.7c2.5,0,12.1-0.9,14.2-2c5.2-3,7.6-13.8,9.8-15.2c2.6-1.6,0.2,7.9,8.5,12.5 c5.7,3.2,113.9,3.8,117.5,3.3Z;      M0.4,40.7c2.5,0,15.5-1.2,17.5-2.4c5.2-3,8.6-17.1,10.8-18.4c2.6-1.6,4.6,9.3,12.8,13.9 c5.7,3.2,105.2,6,108.8,5.5Z;      M0.4,40.7c2.5,0,17.3-3.6,22.7-5.3c5.7-1.8,7.6-26.5,13.1-24.9c7.7,2.2,4.1,16.2,12.3,20.8 c5.7,3.2,98.2,8.5,101.8,8Z;      M0.4,40.7c1.9,0.8,19.9-0.9,27.8-5.5c5.2-3,8.7-31.3,14-29.1c6.2,2.5,6.4,19.6,14.7,24.2 c5.7,3.2,89.8,9.6,93.5,9.1Z;      M0.4,40.7c1.9,0.8,25.9-3.1,33.8-7.7c5.2-3,14.5-27.1,16.8-29.5c4.6-4.8,0.3,23.9,8.5,28.5 c5.7,3.2,87.2,7.9,90.8,7.4Z;      M0.4,40.7c1.9,0.8,32.3-4.1,40.2-8.7c5.2-3,4.2-25.3,22.7-30c23.5-6-21.8,6.8-1.2,29.5 c4.4,4.8,84.7,8.4,88.3,7.9Z;      M0.4,40.7c1.9,0.8,41.2-0.3,44.7-8.7C51.9,15.6,57.8,0.1,67.9,4.3c27.7,11.6-22-9-3.8,25.9 c3,5.8,82.6,9.6,86.3,9.1Z;      M0.4,40.7c1.9,0.8,44.5-0.3,48-8.7C55.2,15.6,65.8,4.1,75.9,8.4c24.2,10.5-21-6-8.5,21.8 c2.8,6.1,79.1,10.1,83,9.1Z;      M0.4,40.7c1.9,0.8,49.4-2.2,54.9-9.5c8.6-11.4,20.8-11.6,25.9-10.6c27.5,5.5-12.8,4.3-9.4,12.4 c2.5,6,75,6.8,78.7,6.3Z;      M0.4,40.7c1.9,0.8,49.6-4.3,54.5-12c7-11.1,14.7-13.3,19.9-13.4c27.9-0.2-12.7,4.9-6.5,17.4 c2.9,5.8,78.5,7.2,82.1,6.7Z;      M0.4,40.7c1.9,0.8,51.9-1.4,57.4-8.7c8.6-11.4,23.3-11.3,29.4-8.6c15.5,6.8-3.9,5.3-1.4,11 c2.6,5.9,61,5.5,64.6,5Z;      M0.4,40.7c1.9,0.8,54.9-0.6,60.4-7.9c8.6-11.4,29.3-8.6,35.1-5.5c6.5,3.5-2.7,3.1-0.2,8.8 c2.6,5.9,51.1,3.7,54.7,3.2Z;      M0.4,40.7c1.9,0.8,55.5-4.2,63.8-8c11.9-5.4,32-5.1,38.1-2.5c5.9,2.5,3.8,1.8,6.6,7 c3.1,5.7,37.9,2.7,41.5,2.2Z;      M0.4,40.7c1.9,0.8,64.6-2.4,72.9-6.2c11.9-5.4,29.2-4.4,35.3-1.8c5.9,2.5,2.6,1.9,9.3,4 c6.2,2,29,3.2,32.6,2.7Z;      M0.4,40.7c1.9,0.8,75.3-0.2,83.6-4c11.9-5.4,24.3-3.5,30.7-1.8c6.9,1.9,7.5,2.7,14.9,3.5 c6.4,0.8,17.1,1.4,20.8,0.9Z;      M0.4,40.7c1.9,0.8,87.5-3,96.6-3c14.3,0,19-2.2,25.4-0.5c6.9,1.9,6.3,1.2,13.7,2 c6.4,0.8,10.7,0.6,14.3,0.1Z;      M0.4,40.7c1.9,0.8,93.7,0,102.9,0c14.3,0,18.6-0.9,25.3-0.9c8.4,0,6.4-0.7,7.6-0.6 c5.1,0.4,10.7,1.3,14.3,0.8Z; M0.4,40.7c1.9,0.8,93.7,0,102.9,0c14.3,0,18.7-0.4,25.3,0c5.3,0.3,6.6-0.1,7.8,0 c5.1,0.4,10.5,0.5,14.1,0Z'