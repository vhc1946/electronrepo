/**
 * Documentation missing
 */
var {app,BrowserWindow,ipcMain} = require('electron');
//swap view in a created BrowserWindow
var swapper = (view,fpath,w=0,h=0)=>{
  if(view&&view!=undefined){
    view.loadURL(fpath);
    if(w!=0){
      view.restore();
      view.setSize(w,h);
    }else{view.maximize();}
  }
}
//load view into a new BrowswerWindow
var loader = (fpath,w=0 ,h=0,close=false,menubar=false,titlebar='show',transparent=false)=>{
    let nwin = new BrowserWindow({
            webPreferences:{
                nodeIntegration:true,
                contextIsolation:false
            },
            width:w<=0?500:w,
            height:h<=0?500:h,
            autoHideMenuBar:menubar,
            titleBarStyle: titlebar,
            transparent:transparent
        });
        if(w==0){
          nwin.maximize();
        }
        nwin.loadURL(fpath);
        if(close){
            nwin.on('close',(eve)=>{
                console.log('App closed from page: fpath');
                app.exit();
            });
        }
    return nwin;
}

module.exports={
  viewtools:{
    swapper,
    loader
  },
  app,
  BrowserWindow,
  ipcMain
}
