
/* FIND parentNode
    Usually used in events to ensure the event belongs to the corrent element
*/
var FINDparentele=(ele,stop)=>{
  if(ele.classList.contains(stop)||ele==document.body){
    if(ele!=document.body){return ele}
    else{return null}
  }else{return FINDparentele(ele.parentNode,stop);}
}

/////////////////////



//  Setup Module ///////////////////////////////////////////////////////////////
var SETUPmodule=(root)=>{
  console.log('Controller Root HAS been declared for view-controller.js')
  ROOT=root;
  for(let x=0;x<stylesheets.length;x++){
    let viewstyles = document.createElement('link');
    viewstyles.setAttribute('rel','stylesheet');
    viewstyles.setAttribute('href','/Tech/bin/css/test.css');
    document.getElementsByTagName('head')[0].prepend(viewstyles);
  }
}

//  PATHS //
var stylesheets = ['gui/styles/layouts/vg-viewcontrols.css'];
var assets={
  viewclose:'assets/icons/cross-red.png'
}
// REPO ROOT //
var ROOT=null;
try{
  SETUPmodule(RROOT);
}catch{console.log('Repo root is not declared')}

/////////////////////////////////////////////////////////////////////////////////

var vcdom={//DOM NAMES
  cont:'viewcontrol-cont',
  menu:{
    cont:'viewcontrol-menu',
    button:'viewcontrol-menu-item',
    selected:'viewcontrol-menu-selected',
    qactions:'viewcontrol-quick-actions',
    qactionbuttons:'viewcontrol-actionbutton'
  },
  port:{
    cont:'viewcontrol-port',
    view:'viewcontrol-port-item',
    selected:'viewcontrol-port-selected'
  },
  util:{
    close:'viewcontrol-port-close'
  }
}

var vcgroup={//STYLE GROUPS
  mtr:{ //menu top right
    cont:'viewcontrol-cont-vt',
    menu:{
      cont:'viewcontrol-menu-hmr'
    }
  },
  mtl:{ //menu top left
    cont:'viewcontrol-cont-vt',
    menu:{
      cont:'viewcontrol-menu-hml'
    }
  },
  mbe:{ //menu bottom even
    cont:'viewcontrol-cont-vb',
    menu:{
      cont:''
    }
  },
  mbr:{ //menu bottom right
    cont:'viewcontrol-cont-vb',
    menu:{
      cont:'viewcontrol-menu-hmr'
    }
  },
  mbl:{ //menu bottom left
    cont:'viewcontrol-cont-vb',
    menu:{
      cont:'viewcontrol-menu-hml'
    }
  },
  mre:{ //menu right even
    cont:'viewcontrol-cont-hr',
    menu:{
      cont:'viewcontrol-menu-vm'
    }
  },
  mrt:{ //menu right top
    cont:'viewcontrol-cont-hr',
    menu:{
      cont:'viewcontrol-menu-vmt'
    }
  },
  mrb:{ //menu right bottom
    cont:'viewcontrol-cont-hr',
    menu:{
      cont:'viewcontrol-menu-vmb'
    }
  },
  mle:{ //menu left even
    cont:'viewcontrol-cont-hl',
    menu:{
      cont:'viewcontrol-menu-vm'
    }
  },
  mlt:{ //menu left top
    cont:'viewcontrol-cont-hl',
    menu:{
      cont:'viewcontrol-menu-vmt'
    }
  },
  mlb:{ //menu left bottom
    cont:'viewcontrol-cont-hl',
    menu:{
      cont:'viewcontrol-menu-vmb'
    }
  }
}

//  PUBLIC FUNCTIONS ///////////////////////////////////////////////////////////

/* Initialize a set of views
    Will take a container and setup anything found in its first child, so nested
    views will not be setup
*/
var SETUPviews=(cont,type='',style=null)=>{
  let buttons = cont.getElementsByClassName(vcdom.menu.cont)[0].getElementsByClassName(vcdom.menu.button); //get the menu for the passed container
  if(vcgroup[type]!=undefined){SETUPviewgroup(cont,type);}

  RESETviews(cont); //make sure the view is defaulted

  for(let x=0;x<buttons.length;x++){ //loop through the menu items
    let view = FINDview(cont,buttons[x].title);
      if(x==0){
        buttons[x].classList.add(vcdom.menu.selected);
        view.classList.add(vcdom.port.selected);
      }
    if(view&&view!=undefined){
      buttons[x].addEventListener('click',(ele)=>{
        if(ele.target.classList.contains(vcdom.menu.button)){SWITCHview(view,ele.target);}
      });
    }
  }
}

var CREATEviewport=(cont,type='',actions=null,style=null)=>{
  cont.classList.add(vcdom.cont);
  let ele = document.createElement('div');
  ele.classList.add(vcdom.menu.cont);
  ele.appendChild(document.createElement('div'));
  ele.appendChild(document.createElement('div'));
  ele.lastChild.classList.add(vcdom.menu.qactions);
  cont.appendChild(ele);


  //add button container
  // if(actions){}

  ele=document.createElement('div');
  ele.classList.add(vcdom.port.cont);
  cont.appendChild(ele);
  SETUPviews(cont,type,style);
}

/* ADD a view
    PASS:
    - name - name of view
    - view - html collection to add to view
    - cont - name of container holding the tnv views and nav
*/
var ADDview=(name,view,cont,del=false,delEve=()=>{})=>{
  if(ROOT){// Check if repo root is setup
    try{
      RESETviews(cont)
    }catch{
      console.log('Container id:',cont.id,' May NOT Exist...');
      return null;
    }
    view.title=name;
    view.classList.add(vcdom.port.view,vcdom.port.selected);
    view.prepend(document.createElement('div'));
    view.firstChild.classList.add('viewcontrol-print-header',vcdom.menu.button,vcdom.menu.selected);
    view.firstChild.innerText = name;
    cont.getElementsByClassName(vcdom.port.cont)[0].appendChild(view);

    var button = document.createElement('div');//create tab button and add
    button.innerText = name
    button.title = name; //change to .title
    button.classList.add(vcdom.menu.button,vcdom.menu.selected);
    button.addEventListener('click',(ele)=>{
      if(ele.target.classList.contains(vcdom.menu.button)){SWITCHview(view,ele.target);}
    });
    if(del){
      button.appendChild(document.createElement('img')).src = ROOT + assets.viewclose;
      button.lastChild.classList.add(vcdom.util.close);
      button.lastChild.addEventListener('dblclick',(ele)=>{
        ele=FINDparentele(ele.target,vcdom.menu.button);
        if(ele){
          console.log('Closing view..');
          delEve(view);
          REMOVEview(ele,cont);
        }
      });
    }

    cont.getElementsByClassName(vcdom.menu.cont)[0].children[0].appendChild(button);
    return view;
  }else{
    console.log('Module May not be setup...')
    return null;
  }

}

var FINDbutton=(name,cont)=>{
  console.log(cont);
  let menu = cont.getElementsByClassName(vcdom.menu.cont)[0].getElementsByClassName(vcdom.menu.button);
  for(let x=0;x<menu.length;x++){
    if(menu[x].title==name){return menu[x]}
  }
  return null;
}
////////////////////////////////////////////////////////////////////////////////
//  PRIVATE FUNCTIONS //////////////////////////////////////////////////////////

var SETUPviewgroup=(cont,grp)=>{
  cont.classList.add(vcgroup[grp].cont);
  cont.getElementsByClassName(vcdom.menu.cont)[0].classList.add(vcgroup[grp].menu.cont);
}

/* Remove the Selected tab
  Set as a click listener in tab button

  Deletes the selected tab button and
  the associated view
*/
var REMOVEview=(button,cont)=>{
  var port = cont.getElementsByClassName(vcdom.port.cont)[0];
  var menu = button.parentNode;
  var reset = false;
  if(button.classList.contains(vcdom.menu.selected)){reset=true}

  port.removeChild(FINDview(cont,button.title));
  menu.removeChild(button);
  if(reset){
    try{port.children[port.children.length-1].classList.add(vcdom.port.selected);}catch{}
    try{menu.children[menu.children.length-1].classList.add(vcdom.menu.selected);}catch{}
    if(port.children.length==0){ //add default view
      //port.appendChild(document.createElement('div'));
      //port.lastChild.innerText = 'SELECT VIEW';
      //port.lastChild.classList.add(vcdom.port.selected);
    }
  }
}

/* Reset the views
    Will return the port and menu to default (no menu OR port items selected)
*/
var RESETviews=(cont)=>{
  let buttons = cont.getElementsByClassName(vcdom.menu.cont)[0].getElementsByClassName(vcdom.menu.selected);
  let views = cont.getElementsByClassName(vcdom.port.cont)[0].children;
  for(let x=0;x<buttons.length;x++){buttons[x].classList.remove(vcdom.menu.selected);}
  for(let x=0;x<views.length;x++){views[x].classList.remove(vcdom.port.selected);}
}

/* Search for a port in a container
    Loops through the ports of a container and tries to match the ports.title
    with the name passed.
*/
var FINDview=(cont,name)=>{
  let views = cont.getElementsByClassName(vcdom.port.cont)[0].children;
  for(let x=0;x<views.length;x++){if(views[x].title==name){return views[x]}}
  return null;
}

var SWITCHview=(view,button)=>{
  RESETviews(view.parentNode.parentNode);
  button.classList.add(vcdom.menu.selected);
  view.classList.add(vcdom.port.selected);
}

var CLEARview=(cont)=>{
  cont.getElementsByClassName(vcdom.menu.cont)[0].children[0].innerHTML='';
  cont.getElementsByClassName(vcdom.port.cont)[0].innerHTML = '';
}
////////////////////////////////////////////////////////////////////////////////
module.exports={
  vcdom,
  SETUPmodule,
  CREATEviewport,
  SETUPviews,
  ADDview,
  FINDbutton,
  FINDview,
  REMOVEview,
  SWITCHview,
  CLEARview
};
