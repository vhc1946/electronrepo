/**
 * Could get moved to Utility's in WebApp repo?
 * Could have some module which contains basic utilities like this, calculations, etc
 */
var getLastDayOfMonth=(year, month)=>{
  return new Date(year, month + 1, 0);
}
var getFirstDayOfMonth=(year,month)=>{
  return new Date(year,month,1);
}

module.exports={
  getLastDayOfMonth,
  getFirstDayOfMonth
}
