
var $ = require('jquery');
var tnvdom={
  cont:'vapi-admin-cont', //variable per program (id)
  nav:{
    cont:'tnv-nav-cont', //(class)
    tab:'tnv-tab-button', //(class)
    tabsele:'tnv-tab-button-selected'
  },
  view:{
    cont:'vapi-admin-editors', //variable per program (id)
    views:'tnv-views-cont', //class
    noselect:'tnv-views-noselection'
  }
}

//only here to make sure the tab button is found
var FindTabButton=(ele)=>{
  if(ele.classList.contains(tnvdom.nav.tab)){
    return ele;
  }else{return FindTabButton(ele.parentNode);}
}

/* ADD a view

*/
var ADDview=(name,view)=>{
  var views = document.getElementById(tnvdom.view.cont);
  if(views.firstElementChild.classList.contains(tnvdom.view.noselect)){
    views.removeChild(views.firstElementChild);
  }
  view.classList.add(name);
  resetviews();
  views.appendChild(view);

  //hide all other views

  $(view).show();
  //create tab button and add
  var tabbutton = document.createElement('div');
  tabbutton.id = name;
  tabbutton.classList.add(tnvdom.nav.tab);
  tabbutton.classList.add(tnvdom.nav.tabsele);
  tabbutton.appendChild(document.createElement('div'));
  tabbutton.lastChild.innerText = name;
  tabbutton.lastChild.addEventListener('dblclick',SELECTtab);
  tabbutton.appendChild(document.createElement('div'));
  tabbutton.lastChild.innerText = 'x';
  tabbutton.lastChild.addEventListener('dblclick',REMOVEtab);
  document.getElementById(tnvdom.nav.cont).appendChild(tabbutton);
  return view;
}

/* Show selected view
  Set as a click listener on tab button

  Hides all views in the view CONTAINER

  Shows the selected view, by finding the
  view with the same class name as the tab button
  id.
*/
var SELECTtab=(ele)=>{
  var views = document.getElementById(tnvdom.view.cont);
  resetviews();
  $(views.getElementsByClassName(FindTabButton(ele.target).id)[0]).show();
  FindTabButton(ele.target).classList.add(tnvdom.nav.tabsele);
}

/* Remove the Selected tab
  Set as a click listener in tab button

  Deletes the selected tab button and
  the associated view
*/
var REMOVEtab=(ele)=>{
  var views = document.getElementById(tnvdom.view.cont);
  var button = FindTabButton(ele.target);
  views.removeChild(views.getElementsByClassName(button.id)[0]);
  try{$(views.lastChild).show();}catch{}
  var bpar = button.parentNode;
  bpar.removeChild(button);
  try{bpar.lastChild.classList.add(tnvdom.nav.tabsele);}catch{}
  if(views.children.length==0){
    views.appendChild(document.createElement('div'));
    views.lastChild.innerText = 'SELECT DOCUMENT';
    views.lastChild.classList.add(tnvdom.view.noselect);
  }
}

var resetviews=()=>{
  var views = document.getElementById(tnvdom.view.cont);
  var nav = document.getElementById(tnvdom.nav.cont);
  for(let x=0;x<views.children.length;x++){
    $(views.children[x]).hide();
    if(nav.children.length>0){nav.children[x].classList.remove(tnvdom.nav.tabsele);}
  }
}

module.exports={
  ADDview,
  tnvdom
}
