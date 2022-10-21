var {CREATEticket} = require('../../../logger/things/support-form.js');

//  Setup Module ///////////////////////////////////////////////////////////////
var SETUPmodule=(root)=>{
  console.log('Controller Root HAS been declared for vg-titlebar.js');
  ROOT=root;
  for(let x=0;x<stylesheets.length;x++){
    let viewstyles = document.createElement('link');
    viewstyles.setAttribute('rel','stylesheet');
    viewstyles.setAttribute('href',ROOT+stylesheets[x]);
    document.getElementsByTagName('head')[0].prepend(viewstyles);
  }
  require('../tools/vg-partials.js').writePart(__dirname + '../../../views/vg-titlebar.txt',document.body,'titlebar-cont', true);
}

//  PATHS //
var stylesheets = ['gui/styles/modules/vg-titlebar.css'];
var assets={
}

// REPO ROOT //
var ROOT=null;
try{
  SETUPmodule(RROOT);
}catch{console.log('Repo root is not declared')}

////////////////////////////////////////////////////////////////////////////////

// Menu Actions //////////////////////////////////
var tbdom={ //menubar
  cont:'titlebar-cont',
  title:'titlebar-title',
  window:{
    close:'titlebar-win-close',
    mini:'titlebar-win-mini',
    maxi:'titlebar-win-maxi'
  },
  more:{
    cont:'titlebar-moretools',
    actions:'titlebar-moretools-quick'
  },
  info:{
    cont:'titlebar-page-user-cont',
    username:'titlebar-username'
  },
  page:{
    save:'titlebar-page-save',
    print:'titlebar-page-print',
    settings:'titlebar-page-settings',
    user:'titlebar-page-user',
    support:'titlebar-page-support'
  },
  utils:{
    buttons:{
      view:'titlbar-button-view',
      action:'titlebar-button-action',
      moretools:'titlebar-button-more'
    },
    groups:{
      right:'titlebar-cont-right',
      left:'titlebar-cont-left'
    }
  }
}
var lastwinsize={
  x:window.innerWidth,
  y:window.innerHeight
}

document.getElementById(tbdom.window.close).addEventListener('click',(ele)=>{  // Close window
  window.close(); 
});
document.getElementById(tbdom.window.mini).addEventListener('click',(ele)=>{  // Minimize window
  ipcRenderer.send('view-minimize',document.getElementById(tbdom.title).innerText);
});

document.getElementById(tbdom.window.maxi).addEventListener('click',(ele)=>{  // Maximize window
  if(screen.availWidth == window.innerWidth && screen.availHeight == window.innerHeight){
    window.resizeTo(lastwinsize.x,lastwinsize.y);
  }else{
    lastwinsize.x = window.innerWidth;
    lastwinsize.y = window.innerHeight;
    window.resizeTo(screen.availWidth,screen.availHeight);
  }
});

document.getElementById(tbdom.page.print).addEventListener('dblclick',(ele)=>{  // Print screen
  ipcRenderer.send('print-screen',{file:document.getElementById(tbdom.title).innerText});
});

document.getElementById(tbdom.more.cont).addEventListener('click',(ele)=>{  // Toggle More Options menu
    let moreele = document.getElementById(tbdom.more.actions);
      if($(moreele).is(":visible")){
        $(moreele).hide();
      }else{$(moreele).show();}

  });

document.getElementById(tbdom.page.support).addEventListener('dblclick',(ele)=>{  // Open a Support Ticket
  CREATEticket();
});


/* ADD actions to title bar
    Function to add an array of elements to the more actions portion
    of the title bar.
*/
var ADDmactions=(acts=[])=>{
  for(let x=0;x<acts.length;x++){
    acts[x].classList.add(tbdom.utils.buttons.action);
    document.getElementById(tbdom.more.actions).appendChild(acts[x]);
  }
}

var ADDqactions=(acts=[])=>{
  for(let x=0;x<acts.length;x++){
    acts[x].classList.add(tbdom.utils.buttons.action);
    document.getElementById(tbdom.utils.groups.left).insertBefore(acts[x],document.getElementById(tbdom.info.cont)); //refresh button
  }
}
var CREATEactionbuttons=(acts)=>{
  let alist = [];
  for(let ma in acts){
    alist.push(document.createElement('img'));
    for(let as in acts[ma]){
      alist[alist.length-1][as]=acts[ma][as];
    }
  }
  return alist;
}

var INITtitlebarONmain=(ipcMain)=>{
  ipcMain.on('view-minimize',(eve,data)=>{//
    BrowserWindow.getFocusedWindow().minimize();
  });
}

module.exports={
  tbdom,
  INITtitlebarONmain,
  ADDmactions,
  ADDqactions,
  CREATEactionbuttons
}
