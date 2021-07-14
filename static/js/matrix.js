var num_thoughts = 7;
var curr_ind = 0;

fresh_thoughts = Array.from(Array(num_thoughts).keys());
old_thoughts = [];

function new_thought() {
    var thought_ind = Math.floor(Math.random() * fresh_thoughts.length);
    var this_thought = fresh_thoughts[thought_ind];
    old_thoughts.push(fresh_thoughts[thought_ind]);
    fresh_thoughts.splice(thought_ind, 1);
    console.log(fresh_thoughts);

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        document.getElementById("thought").innerHTML = this.responseText;
    }
    xhttp.open("GET", 'thoughts/'+this_thought);
    xhttp.send();

    curr_ind +=1;

    if (fresh_thoughts.length == 0){
        console.log("resetting");
        fresh_thoughts = Array.from(Array(num_thoughts).keys());
        old_thoughts = [];
        curr_ind = 0;
    }
}

function next_thought(){
    if (curr_ind == old_thoughts.length){
        new_thought();
    } else {
        curr_ind += 1;
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
            document.getElementById("thought").innerHTML = this.responseText;
        }
        xhttp.open("GET", thought+'/'+ old_thoughts[curr_ind]);
        xhttp.send();
    }
}

function prev_thought(){
    if (curr_ind > 0){
        curr_ind -= 1;
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
            document.getElementById("thought").innerHTML = this.responseText;
        }
        xhttp.open("GET", thought+'/'+ old_thoughts[curr_ind]);
        xhttp.send();
    }
}

new_thought();