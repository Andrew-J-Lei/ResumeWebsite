// AJAX for Projects
function change_subcontent(type, sub_num) {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    document.getElementById(type+"_ch_content").innerHTML = this.responseText;
  }
  xhttp.open("GET", type+'/'+sub_num);
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


