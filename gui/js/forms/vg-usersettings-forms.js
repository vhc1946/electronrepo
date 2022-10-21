
var usedom={
  cont:'user-settings',
  groups:'user-groups',
  users:'user-list',
}

var SETusersettings=()=>{
  if(appsettings){
    objedit.LOADedit(appsettings.users,document.getElementById(usedom.users));
    objedit.LOADedit(appsettings.groups,document.getElementById(usedom.groups));
  }
}

var GETusersettings=()=>{
  appsettings.users = objedit.GETedit(document.getElementById(usedom.users));
  appsettings.groups = objedit.GETedit(document.getElementById(usedom.groups));
}

document.getElementById(usedom.cont).addEventListener('change',(ele)=>{
  GETusersettings();
});

module.exports={
  usedom,
  SETusersettings,
  GETusersettings
}
