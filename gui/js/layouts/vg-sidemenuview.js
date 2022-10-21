/* Side Menu Views
    This module handles view navigation through a side menu.

    USAGE

    - SETUP -

    The user will declare a container with children:
      - smvdom.menu
      - smvdom.views
    The container can hold other elements in it. In "main.js", the file can be
    required, and SETmenuitems(cont) can be called to initiate the navigation.
    SETmenuitems(cont) can be called for as many sidemenuviews' needed.

    - NAVIGATION -
    'Click' events are placed on menu items to toggle views.

    - FURTHER -
    A sidemenuview can be nexted in views to create a sub menu
*/
var smvdom={
  cont:'sidemenuview-cont',
  menu:'sidemenuview-menu',
  views:'sidemenuview-views',
  utils:{
    menuitem:'sidemenuview-menu-item',
    view:'sidemenuview-view',
    selected:'sidemenuview-selected'
  }
}


var SETmenuitems=(cont)=>{
  let items = cont.getElementsByClassName(smvdom.menu)[0].children;
  HIDEviews(cont);
  for(let x=0;x<items.length;x++){
    items[x].addEventListener('click',(ele)=>{
      //try{
        let view = document.getElementById(ele.target.title);
        CLEARmenu(cont);
        ele.target.classList.add(smvdom.utils.selected);
        HIDEviews(cont);
        $(view).show();
      //}catch{};
    });
  }
}

var HIDEviews=(cont)=>{
  let views = cont.getElementsByClassName(smvdom.views)[0].children;
  for(let x=0;x<views.length;x++){
    $(views[x]).hide();
  }
}

var CLEARmenu=(cont)=>{
  let items = cont.getElementsByClassName(smvdom.utils.menuitem);
  for(let x=0;x<items.length;x++){
    items[x].classList.remove(smvdom.utils.selected);
  }
}

module.exports={
  smvdom,
  SETmenuitems
}
