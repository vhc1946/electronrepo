
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
  let arr = {};
  for(let x=0;x<list.length;x++){
    if(list[x].callDate!=''){
      arr[new Date(list[x].callDate).toLocaleDateString('en-us',{weekday:'long'})]!=undefined?arr[new Date(list[x].callDate).toLocaleDateString('en-us',{weekday:'long'})]++:arr[new Date(list[x].callDate).toLocaleDateString('en-us',{weekday:'long'})]=0
    }
  }
  return arr;
}
// Count By Creatorcd
var dispatchers=[
  'STRSA',
  'DOUKR',
  'SCOMI',
  'DUSHE',
  'MEAER',
  'STEKE'
]


var RunEOM=(list,dept,month=new Date().getMonth(),year=new Date().getYear())=>{
  console.log('YEAR- ',year);

  let repdat = {
    month:month,
    depts:[]
  };
  let mlist = new ObjList();
  for(let x = 0;x<dept.length;x++){ //run report for each department
    mlist.SETlist(list);
    let data={
      dept:dept[x],
      totals:{
        count:0,
        open:0,
        completed:0,
        canceled:0
      },
      cats:{},
      time:{
        days:{
          titles:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
        },
        hours:{
        }
      },
      dispatch:{}
    }
    mlist.SETlist(mlist.TRIMlist({dept:dept[x]})); //trim by department

    let dlist = [];
    for(let y=0;y<mlist.list.length;y++){ //trim by call date month
      if(mlist.list[y].strtDate!=''){
        if(mlist.list[y].strtDate.split('-')[1].trim('0')-1==month && mlist.list[y].strtDate.split('-')[0]-1900==year){
          dlist.push(mlist.list[y]);
        }
      }
    }

    data.totals.count = dlist.length;
    mlist.SETlist(dlist);//calls of that month

    data.totals.open = mlist.TRIMlist({status:'O'}).length;
    data.totals.completed = mlist.TRIMlist({status:'X'}).length;
    data.totals.canceled = mlist.TRIMlist({status:'Z'}).length;

    let catsum = {
      count:data.totals.count,
      costing:{
        billed:0,
        matCost:0,
        labCost:0,
        labHours:0
      }
    }
    for(let y=0;y<wocatlist.length;y++){
      let catlist = mlist.TRIMlist({cat:wocatlist[y]});
      data.cats[wocatlist[y]]={
        count:catlist.length,
        costing:{
          billed:0,
          matCost:0,
          labCost:0,
          labHours:0
        }
      }
      for(let z=0;z<catlist.length;z++){ //get costing per category
        for(let c in data.cats[wocatlist[y]].costing){
          data.cats[wocatlist[y]].costing[c]+=catlist[z][c];
          catsum.costing[c]+=catlist[z][c];//apply to total
        }
      }
    }
    data.cats.summary = catsum;

    data.time.days.values = FLTbyday(mlist.list);
    data.time.hours = FLTbyhour(mlist.list);

    for(let x=0;x<dispatchers.length;x++){
      let discount = mlist.TRIMlist({createBy:dispatchers[x]}).length;
      if(discount>0){
        data.dispatch[dispatchers[x]]=discount;
      }
    }
    repdat.depts.push(data);
  }
  return repdat

}

module.exports={
  RunEOM
}
