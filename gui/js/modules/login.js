const $=require('jquery');
var {writePart} = require('../tools/vg-partials.js');

var loginroutes={//login routes
  submit:'SUBMIT-userlogin',
  getuser:'GET-user'
}

var lodom={//dom names for form
  cont:'login-area',
  inputs:{
    uname:'login-username',
    pswrd:'login-password',
  },
  actions:{
    submit:'login-submit',
  }
}

var loginls={//login local storage
  curruser: 'app-curruser'
}

try{ //attempt to setup for client, skip if error
  $(document.getElementById('titlebar-page-user')).hide();
  
  var {DropNote} = require ('./vg-dropnote.js');
  const {ipcRenderer} = require('electron');

  var SETUPmodule=(root)=>{
    console.log('Controller Root HAS been declared for login.js')
    ROOT=root;
    for(let x=0;x<stylesheets.length;x++){
      let viewstyles = document.createElement('link');
      viewstyles.setAttribute('rel','stylesheet');
      viewstyles.setAttribute('href',ROOT+stylesheets[x]);
      document.getElementsByTagName('head')[0].prepend(viewstyles);
    }
  }

  //  PATHS //
  var stylesheets = ['gui/styles/modules/vg-styles-login.css'];
  var assets={
  }

  // REPO ROOT //
  var ROOT=null;
  try{
    SETUPmodule(RROOT);
  }catch{console.log('Repo root is not declared')}

  for(let i in lodom.inputs){
    document.getElementById(lodom.inputs[i]).addEventListener('keypress',(eve)=>{
      if(eve.key == 'Enter'){document.getElementById(lodom.actions.submit).click();};
    });
  }

  document.getElementById(lodom.actions.submit).addEventListener('click',(ele)=>{
    let lform = { //object to collect form
      uname:String(document.getElementById(lodom.inputs.uname).value).toUpperCase(),
      pswrd:document.getElementById(lodom.inputs.pswrd).value
    }
    localStorage.setItem(loginls.curruser,JSON.stringify(lform)); //mark local storage for current user
    ipcRenderer.send(loginroutes.submit,lform);
  });


  var cuser = JSON.parse(localStorage.getItem(loginls.curruser));
  if(cuser.uname!=undefined){
    document.getElementById(lodom.inputs.uname).value = cuser.uname;
  }

  ipcRenderer.on(loginroutes.submit,(eve,data)=>{
    if(!data.user){
      DropNote('tr',data.msg,'red');
      localStorage.setItem(loginls.curruser,null);
    }else{DropNote('tr',data.msg,'green');}
  });

}catch{}

module.exports={
  loginroutes,
  loginls
}
