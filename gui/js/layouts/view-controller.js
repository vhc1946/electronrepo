/**
 * Documentation needed
 */
var {CreateComponent}=require('../tools/vhc-components.js')
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
    viewstyles.setAttribute('href',ROOT+stylesheets[x]);
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

var vdom = (rroot='')=>{
  return{
    [`.${vcdom.cont}.div`]:{
      attributes:{},
      children:{
        [`.${vcdom.menu.cont}.div`]:{
          attributes:{},
          children:{
            '.viewcontrol-menubox.div':{
              attributes:{},
              children: null
            },
            [`.${vcdom.menu.qactions}.div`]:{
              attributes:{},
              children: null
            }
          }
        },
        [`.${vcdom.port.cont}.div`]:{
          attributes:{},
          children: null
        }
      }
    }
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
      cont:'viewcontrol-menu-hm'
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
class ViewGroup{
  constructor({
    create=true,
    cont=document.createElement('div'),
    type='',
    style=null,
    delEve=()=>{},
    swtchEve=()=>{},
    qactions={}
  }){
    this.cont=cont;
    if(create){
      this.group=CreateComponent(vdom());
      this.cont.appendChild(this.group);
    }
    else{this.group=this.cont;}


    this.port=this.group.getElementsByClassName(vcdom.port.cont)[0];
    this.menu=this.group.getElementsByClassName(vcdom.menu.cont)[0];
    this.buttons=this.menu.children[0]; //to get navigation menu

    this.swtchEve=swtchEve;
    this.delEve=delEve;

    if(vcgroup[type]!=undefined){this.SETUPviewgroup(type);}

    for(let x=0;x<this.buttons.children.length;x++){
      this.buttons.children[x].addEventListener('click',(ele)=>{
        if(ele.target.classList.contains(vcdom.menu.button)){
          this.SWITCHview(this.FINDview(this.buttons.children[x].title),ele.target);
        }
      });
    }
    try{$(this.buttons.children[0]).click();}
    catch{}
    if(create){this.ADDqactions(qactions);}
  }

  /* ADD a view
      PASS:
      - name - name of view
      - view - html collection to add to view
      - cont - name of container holding the tnv views and nav
  */
  ADDview(name,view,del=false){
    try{this.RESETviews();}
    catch{
      console.log('Container id:',this.group.id,' May NOT Exist...');
      return null;
    }
    view.title=name;
    view.classList.add(vcdom.port.view,vcdom.port.selected);
    this.port.appendChild(view);
    console.log()
    var button = document.createElement('div');//create tab button and add
    button.innerText = name
    button.title = name; //change to .title
    button.classList.add(vcdom.menu.button,vcdom.menu.selected);

    button.addEventListener('click',(ele)=>{
      if(ele.target.classList.contains(vcdom.menu.button)){
        this.SWITCHview(view,ele.target);
      }
    });
    if(del){
      button.appendChild(document.createElement('img')).src = RROOT + 'assets/icons/cross.png';
      button.lastChild.classList.add(vcdom.util.close);
      button.lastChild.addEventListener('dblclick',(ele)=>{
        ele=FINDparentele(ele.target,vcdom.menu.button);
        if(ele){
          console.log('Closing view..');
          this.delEve(ele); //optional delete process
          this.REMOVEview(ele);
        }
      });
    }
    this.buttons.appendChild(button);
    return view;
  }

  ADDqactions(qacts){
    //try{
      for(let aq in qacts){
        let button=document.createElement('div');
        let image=document.createElement('img');
        button.id = qacts[aq].id;
        image.src = qacts[aq].src;
        button.classList.add(vcdom.menu.qactionbuttons, 'icon-action-button');
        button.appendChild(image);
        this.menu.children[1].appendChild(button);
      }
    //}catch{console.log('Could not add quick actions')}
  }

  /* Remove the Selected tab
    Set as a click listener in tab button

    Deletes the selected tab button and
    the associated view
  */
  REMOVEview(button){
    var reset = false;
    if(button.classList.contains(vcdom.menu.selected)){reset=true}
    this.port.removeChild(this.FINDview(button.title));
    this.buttons.removeChild(button);
    if(reset){
      try{this.port.children[this.port.children.length-1].classList.add(vcdom.port.selected);}catch{}
      try{this.buttons.children[this.buttons.children.length-1].classList.add(vcdom.menu.selected);}catch{}
      if(this.port.children.length==0){ //add default view
        //port.appendChild(document.createElement('div'));
        //port.lastChild.innerText = 'SELECT VIEW';
        //port.lastChild.classList.add(vcdom.port.selected);
      }
    }
  }

  /* Reset the views
      Will return the port and menu to default (no menu OR port items selected)
  */
  RESETviews(){
    let buttons = this.menu.getElementsByClassName(vcdom.menu.selected);
    let views = this.port.children;
    for(let x=0;x<buttons.length;x++){buttons[x].classList.remove(vcdom.menu.selected);}
    for(let x=0;x<views.length;x++){views[x].classList.remove(vcdom.port.selected);}
  }

  /* Search for a port in a container
      Loops through the ports of a container and tries to match the ports.title
      with the name passed.
  */
  FINDview(name){
    let views = this.port.children;
    for(let x=0;x<views.length;x++){if(views[x].title==name){return views[x]}}
    return null;
  }

  FINDbutton(name){
    let buts = this.buttons.children;
    for(let x=0;x<buts.length;x++){
      console.log(buts[x])
      if(buts[x].title==name){return buts[x]}
    }
    return null;
  }

  SWITCHview(view,button){
    this.RESETviews();
    button.classList.add(vcdom.menu.selected);
    view.classList.add(vcdom.port.selected);
    this.swtchEve(this.cont,view,button);//optional switch function
  }

  SETUPviewgroup(grp){
    this.group.classList.add(vcgroup[grp].cont);
    this.menu.classList.add(vcgroup[grp].menu.cont);
  }

  CLEARview(){
    this.menu.children[0].innerHTML='';
    this.port.innerHTML = '';
  }
}

////////////////////////////////////////////////////////////////////////////////
module.exports={
  vcdom,
  SETUPmodule,
  ViewGroup
};
