
var {ObjList} = require('../box/vg-lists.js');


// Count WOs by category
var wocatlist = [
  'Flat Rate',
  'Quote',
  'T&M',
  'Premium RM',
  'Ultimate RM',
  'Classic RM',
  'Clean/Check',
  'Warranty',
  'Training',
  'Meetings',
  'Truck Repair',
  'Other',
  'Return Trip',
  'Install',
  'Comm Maint',
  'Lead',
  'Duct Clean'
]
// Count By Time of day
var FLTbyhour=(list)=>{
  let arr=new Array(24).fill(0);

  for(let x=0;x<list.length;x++){
    if(list[x].callTime!=''){
      let stime = list[x].callTime.split(':');
      stime = String(stime[1]).includes('a')?Number(stime[0]):Number(stime[0])+12;
      arr[stime-1]++;
    }
  }
  return arr;
}
// Count By Day of week
var FLTbyday=(list)=>{
  let arr = new Array(7).fill(0);
  for(let x=0;x<list.length;x++){
    if(list[x].callDate!=''){arr[new Date(list[x].callDate).getDay()]++;}
  }
  return arr;
}
// Count By Creator
var dispatchers=[
  'STRSA',
  'DOUKR',
  'SCOMI',
  'DUSHE',
  'MEAER',
  'STEKE'
]

var RunEOM=(list,dept='300',month=new Date().getMonth(),year=new Date().getYear())=>{
  let data={
    month:month,
    totals:{
      count:0,
      open:0,
      completed:0,
      canceled:0
    },
    cats:{},
    time:{
      days:{
        title:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
      },
      hours:{

      }
    },
    dispatch:{}
  }

  let mlist = new ObjList(list);
  mlist.SETlist(mlist.TRIMlist({dept:dept}));

  let dlist = [];
  console.log(mlist.list.length);
  for(let x=0;x<mlist.list.length;x++){ //trim by call date month
    if(new Date(mlist.list[x].callDate).getMonth()==month && new Date(mlist.list[x].callDate).getYear()==year){
      dlist.push(mlist.list[x]);
    }
  }
  data.totals.count = dlist.length;

  mlist.SETlist(dlist);

  data.totals.open = mlist.TRIMlist({status:'O'}).length;
  data.totals.completed = mlist.TRIMlist({status:'X'}).length;
  data.totals.canceled = mlist.TRIMlist({status:'Z'}).length;

  for(let x=0;x<wocatlist.length;x++){
    data.cats[wocatlist[x]]=mlist.TRIMlist({cat:wocatlist[x]}).length;
  }

  data.time.days.values = FLTbyday(mlist.list);
  data.time.hours = FLTbyhour(mlist.list);

  for(let x=0;x<dispatchers.length;x++){
    data.dispatch[dispatchers[x]]=mlist.TRIMlist({createBy:dispatchers[x]}).length;
  }

  return data

}

module.exports={
  RunEOM
}
