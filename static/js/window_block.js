var okay_window;

function window_check(){
    // console.log("Checking window size");
    var max_width = 1300;
    var min_width = 1000;
    // console.log(window.innerWidth)
    var warning = '<text style="top:100px"> My apologies, but unfortunately my site is optimized to specific window size of ~1200px. <br> \
    Please help me let you view the site by adjusting your window width this way <br>';
    if ((window.innerWidth > max_width) || (window.innerWidth < min_width)) {
        blocker.style.width = window.innerWidth;
        // console.log("Bad window size");
        if (window.innerWidth > max_width){
          warning += '<text style="font-size:150px"> < </text> </text>';
        } else {
          warning += '<text style="font-size:150px"> > </text> </text>';
        }
        blocker.innerHTML = warning;
        blocker.style.display = "block";
        okay_window = false;
    } else {
        blocker.style.display = "none"
        okay_window = true;
    }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var blocker = document.createElement("div");
blocker.style.width = "100%";
blocker.style.height = "5000px";
blocker.style.backgroundColor = "white";
blocker.style.zIndex = "10000";
blocker.style.position = "absolute";
blocker.style.textAlign = "center";

const insertDiv = document.getElementById("site_nav_bar");
document.body.insertBefore(blocker, insertDiv);
window_check();

// while(block_until_ready() == false);

// console.log("Running window blocker");
window.addEventListener('resize', window_check);