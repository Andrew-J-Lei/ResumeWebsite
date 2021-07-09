var subcontent_dict = {'num_lit_show':4, 'curr_lit_show':1, 
'num_anal_bot':4, 'curr_anal_bot':1, 
'num_ResumeWebsite':4, 'curr_ResumeWebsite':1, 
'num_SDP':3, 'curr_SDP':1,
'num_ECE118':3, 'curr_ECE118':1,
};

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

function main(){
  change_subcontent('lit_show',1);
  change_subcontent('anal_bot',1);
  change_subcontent('ResumeWebsite',1);
  // change_subcontent('ECE118',1, false);
  // change_subcontent('SDP',1, false);
}

main();