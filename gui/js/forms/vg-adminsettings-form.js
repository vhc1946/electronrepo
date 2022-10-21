
var admdom = {
  cont:'admin-settings'
}

var SETadminsettings=(settings)=>{
  objedit.LOADedit(settings,document.getElementById(admdom.cont));
}

var GETadminsettings=()=>{
  return objedit.GETedit(document.getElementById(admdom.cont));
}

module.exports={
  admdom,
  SETadminsettings
}
