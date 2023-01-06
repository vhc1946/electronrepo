/**
 * Utility functions
 * Could have some module which contains basic utilities like this, calculations, excel stuff, etc
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
