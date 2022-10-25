
var {ObjList} = require('../box/vg-lists.js');


var sctypemaps = {
  '300':['CLASSIC','PREMIUM','ULTIMATE'],
  '350':['RESIDENTIAL'],
  '400':['COMMERCIAL']
}

/* Count by type
    A list of types needs to be created
    to determine what type a contract falls
    under

    PASS:
    - list [] - array aservicecontract()
    - dept '' - the department to filter
    - fltrs {} - optional filters


    RETURN:
    - object:{
      'typename':[aservicecontract()s]
    }
*/
var LISTbytype=(list,dept)=>{
  let nlist={};
  if(sctypemaps[dept]!=undefined){//setup the department types
    for(let x=0;x<sctypemaps[dept].length;x++){ //setup nlist object
      nlist[sctypemaps[dept][x]] = []; //initialize array for contracts
    }
    for(let x=0;x<list.length;x++){ //loop through and sort list
        for(let nl in nlist){
          if(list[x].type.charAt(0)==nl.charAt(0)){ //check the type
            nlist[nl].push(list[x]);//add contract
          }
      }
    }
  }
  return nlist;
}

/* GET list of expiring contracts
    Creates a list of contracts expiring in a
    specified month
    PASS:
    - list [] - array aservicecontract()
    - fltrs {} - optional filters,
    - month 0-11 - represent a month

    RETURN:
    - array of service contract objects that meet requirements
*/
var LISTexpired=(list,endDate=new Date())=>{
  let nlist=[];
  for(let x=0;x<list.length;x++){
    if(new Date(list[x].enddate) < endDate){nlist.push(list[x]);}
  }
  return nlist
}

var LISTcancelsbymonth=(list,month=new Date().getMonth())=>{
  let nlist=[];
    let d = new Date(); //todays date
    for(let x=0;x<list.length;x++){
      let edate = new Date(list[x].enddate);
      if(edate.getYear()==d.getYear()&&list[x].status=='I'&&edate.getMonth()==month){
        nlist.push(list[x]);
      }
    }
    return nlist
}
/* GET list of renewals by month
    Creates a list of contracts renewed in a
    specified month
    PASS:
    - list [] - array aservicecontract()
    - fltrs {} - optional filters,
    - month 0-11 - represent a month

    RETURN:
    - array of service contract objects that meet requirements
*/
var LISTrenewalsbymonth=(list,month=new Date().getMonth())=>{
  let nlist=[];
  let d = new Date(); //todays date
  for(let x=0;x<list.length;x++){
    let sdate = new Date(list[x].startdate);
    if(sdate.getMonth()==month&&sdate.getYear()==d.getYear()&&list[x].origid!=''){
      nlist.push(list[x]);
    }
  }
  return nlist
}

/* GET list of renewals by month
    Creates a list of contracts renewed in a
    specified month
    PASS:
    - list [] - array aservicecontract()
    - fltrs {} - optional filters,
    - month 0-11 - represent a month

    RETURN:
    - array of service contract objects that meet requirements
*/
var LISTnewbymonth=(list,month=new Date().getMonth())=>{
  let nlist=[];
  let d = new Date(); //todays date
  for(let x=0;x<list.length;x++){
    let sdate = new Date(list[x].startdate);
    if(sdate.getMonth()==month&&sdate.getYear()==d.getYear()&&list[x].origid==''){
      nlist.push(list[x]);
    }
  }
  return nlist
}


var RunEOM=(list,dept='300',endDate=new Date())=>{
  let mlist = new ObjList(list);
  let tlist = [];
  mlist.SETlist(mlist.TRIMlist({cat:dept}));
  for(let x=0;x<mlist.list.length;x++){ //trim by startdate
    if(endDate>=new Date(mlist.list[x].startdate)){
      tlist.push(mlist.list[x])
    }
  }
  mlist.SETlist(tlist);
  let alist = mlist.TRIMlist({status:'A'});

  let data = {
    month:endDate.getMonth(),

    expires:LISTexpired(alist,endDate),
    renewals:LISTrenewalsbymonth(alist,endDate.getMonth()),
    cancels:LISTcancelsbymonth(mlist.TRIMlist({status:'I'}),endDate.getMonth()),
    news:LISTnewbymonth(alist,endDate.getMonth()),
    typetotals:{},
    totals:{
      total:alist.length,
      expired:0,
      renewed:0,
      canceled:0,
      news:0
    }
  }
  data.totals.expired = data.expires.length;
  data.totals.renewed = data.renewals.length;
  data.totals.news = data.news.length;
  data.totals.canceled=data.cancels.length;

  data.types = LISTbytype(alist,dept);
  let ilist = LISTbytype(mlist.TRIMlist({status:'I'}),dept);

  for(let t in data.types){
    data.typetotals[t] = {};

    data.typetotals[t].count=data.types[t].length;

    data.typetotals[t].expired=LISTexpired(data.types[t],endDate).length;

    data.typetotals[t].renewed=LISTrenewalsbymonth(data.types[t],endDate.getMonth()).length;

    data.typetotals[t].cancels=LISTcancelsbymonth(ilist[t],endDate.getMonth()).length;

    data.typetotals[t].news=LISTnewbymonth(data.types[t],endDate.getMonth()).length;

  }
  /////////////////////////////////////////////////


  // Format Data for charts ///////////////////////


  ////////////////////////////////////////////////
  return data
}


module.exports={
  RunEOM
}
