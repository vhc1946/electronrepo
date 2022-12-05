
var XlsxPop = require('xlsx-populate'); //https://github.com/dtjohnson/xlsx-populate
var {ExcelDateToJSDate} = require('../../tools/box/xltools.js');

var CREATEcontract=(quote,sysnum,pnum,optnum,newgrp)=>{
  let contract = {
    jobnum:'',
    jobname:quote.name,
    strtdate:'',
    solddate:new Date().toISOString().split('T')[0],
    cons:quote.estimator,

    group:quote.info.build.systems[sysnum].tiers[optnum].info[newgrp.toLowerCase()+"_group"],
    system:{
      name:quote.info.build.systems[sysnum].name,
      tier:quote.info.build.systems[sysnum].tiers[optnum].name,
      btuheating:quote.info.build.systems[sysnum].btuheating,
      btucooling:quote.info.build.systems[sysnum].btucooling,
      outlocation:quote.info.build.systems[sysnum].outlocation,
      inlocation:quote.info.build.systems[sysnum].inlocation,
    },
    customer:{
      name:quote.customer.name,
      street:quote.street,
      city:quote.city,
      state:quote.state,
      zip:quote.zip,
      longcity:quote.city + ', ' + quote.state + ' ' + quote.zip,
      phone:quote.customer.phone,
      email:quote.customer.email
    },
    equipment:null,

    finance:{
      ameren:newgrp=='SYS'?quote.info.build.systems[sysnum].tiers[optnum].size.rebateelec:0,
      manf:newgrp=='SYS'?quote.info.build.systems[sysnum].tiers[optnum].info.discmfg:0,
      net:quote.info.pricing.systems[sysnum].tiers[optnum].priceops[pnum].opts[newgrp.toLowerCase()+"price"].price,
      spire:null,
      instntdscnt:newgrp=='SYS'?quote.info.build.systems[sysnum].tiers[optnum].info.discinstnt:quote.info.build.systems[sysnum].tiers[optnum].info.discinstnt/2,
      spcldscnt:quote.info.build.systems[sysnum].tiers[optnum].info.discspcl,
      creditfedtax:newgrp=='SYS'?quote.info.build.systems[sysnum].tiers[optnum].size.creditfedtax:0
    },

    ratings:null,

    additions:CLEANadditions(optnum,quote.info.build.systems[sysnum].additions),
    enhancements:CLEANenhances(optnum,quote.info.build.systems[sysnum].enhancments),
  }
  contract.equipment = SETequipment(quote.info.build.systems[sysnum].tiers[optnum],newgrp,contract.group,quote.info.key.groups[quote.info.build.systems[sysnum].group].optheads);
  contract.finance.spire = CLEANspire(quote.info.build.systems[sysnum].tiers[optnum],contract.group);
  contract.ratings = SETratings(quote.info.build.systems[sysnum].tiers[optnum],contract.group,newgrp);
  return contract;
}

var SETequipment=(system,newgrp,group,optheads)=>{
  let equipment={
    warrpart:[],
    warrlab:[],
    warrlabel: [],
    brand:[],
    model:[],
    label:[]
  }

  switch(newgrp){   //Sets new Group based on SYSTEM/PARTIAL, deletes unused equip from Final Contract/Object, and sets price
    case 'SYS':
      equipment.label.push([optheads.outmodel]);
      equipment.label.push([optheads.innmodel]);
      equipment.label.push([optheads.inmodel]);
      equipment.model.push([system.size.outmodel]);
      equipment.model.push([system.size.innmodel]);
      equipment.model.push([system.size.inmodel]);
      break;
    case 'IN':
      if(system.info.sys_group=='AC90'||'AC80'||'HP90'||'HP80'){
        equipment.label.push([optheads.inmodel]);
        equipment.model.push([system.size.inmodel]);
      }else{
        equipment.label.push([optheads.outmodel]);
        equipment.label.push([optheads.innmodel]);
        equipment.model.push([system.size.outmodel]);
        equipment.model.push([system.size.innmodel]);
      }
      break;
    case 'OUT':
      if(system.info.sys_group=='AC90'||'AC80'||'HP90'||'HP80'){
        equipment.label.push([optheads.outmodel]);
        equipment.label.push([optheads.innmodel]);
        equipment.model.push([system.size.outmodel]);
        equipment.model.push([system.size.innmodel]);
      }else{
        equipment.label.push([optheads.inmodel]);
        equipment.model.push([system.size.inmodel]);
      }
      break;
  }
  equipment.label.push([optheads.statmodel]);
  equipment.model.push([system.size.statmodel]);

  /* Warranty Setup */
  for(let w=0;w<equipment.label.length;w++){
    if(equipment.label[w]!='Thermostat'){
      equipment.warrlabel.push(equipment.label[w]);
      equipment.warrlab.push([system.info.warrlab]);
      equipment.warrpart.push([system.info.warrparts]);
      if(equipment.label[w]=='Gas Furnace'){
        equipment.warrlabel.push(['Heat Exchanger']);
        if(system.info.sys_group.substring(2)=='90'){
          equipment.warrlab.push([system.info.warrlab]);
          equipment.warrpart.push(['Life']);
        }else if(system.info.sys_group.substring(2)=='80'){
          equipment.warrlab.push([system.info.warrlab]);
          equipment.warrpart.push(['20']);
        }
      }
    }
  }
  return equipment
}


var SETratings=(system,group,newgrp)=>{
  let rtings=[];
  rtings.seer = newgrp=='SYS'?system.size.seer:'';
  rtings.eer = newgrp=='SYS'?system.size.eer:'';
  rtings.ahri = newgrp=='SYS'?system.size.ahri:'';
  rtings.account='';
  rtings.holder='';

  switch(group){
    case 'HPAH':
    case 'HPEV':
    case 'HPON':
      rtings.afue = '';
      rtings.hspf = system.size.syseffic;
      break;
    case 'HP80':
    case 'HP90':
      rtings.afue = '';
      rtings.hspf = system.size.syseffic;
      break;
    default:
      rtings.afue = system.size.syseffic;
      rtings.hspf = '';
        break;
  }
  return rtings;
}


var CLEANspire=(system,group)=>{  //Will get more intense!
  let spire='';
  if(group.substring(2)==90){
    spire = system.size.rebategas;
  }else{
    spire = 25;
  }
  return spire;
}


var CLEANadditions=(optnum,additions)=>{
  let adds=[];
  for(let a=0;a<additions.length;a++){
    if(additions[a].tiers[optnum]>0){
      adds.push({
        name:additions[a].name,
        notes:additions[a].notes,
        qty:additions[a].tiers[optnum]
      });
    }
  }
  return adds;
}

var CLEANenhances=(optnum,enhances)=>{
  let enhc=[];
  for(let a=0;a<enhances.length;a++){
    if(enhances[a].tiers[optnum]>0){
      enhc.push({
        name:enhances[a].name,
        notes:enhances[a].notes,
        qty:enhances[a].tiers[optnum]
      });
    }
  }
  return enhc;
}

var PARSEexcel=(contract)=>{
  return new Promise((resolve,reject)=>{
    //console.log(contract);
    XlsxPop.fromFileAsync(contract).then(workbook => {
      var datasheet = workbook.sheet("PDaA");
      
      let tempc = {  //Temporary contract object
        jobnum : datasheet.cell("AS3").value(),
        strtdate:ExcelDateToJSDate(datasheet.cell("AJ3").value()),
        solddate:ExcelDateToJSDate(datasheet.cell("T56").value()),
        cons:datasheet.cell("G57").value(),

        group:'',
        /* Sys Info */
        system:{
          name:datasheet.cell("K28").value(),
          btucooling:datasheet.cell("K30").value(),
          outlocation:datasheet.cell("AO28").value(),
          inlocation:datasheet.cell("AO29").value(),
        },
        customer:{
          name:datasheet.cell("K9").value(),
          street:datasheet.cell("K10").value(),
          city:datasheet.cell("K11").value().split(',')[0],
          zip:datasheet.cell("K11").value().split(' ')[2],
          longcity:datasheet.cell("K11").value(),
          phone:datasheet.cell("K12").value(),
          email:datasheet.cell("K13").value()
        },
        equipment:{
          warrpart:datasheet.cell("K22").value(),
          warrlab:datasheet.cell("O22").value(),
          brand:[],
          model:[],
          label:[]
        },
        finance:{
          instntdscnt:datasheet.cell("AS11").value(),
          ameren:datasheet.cell("AS12").value(),
          manf:datasheet.cell("AS13").value(),
          net:datasheet.cell("AS16").value(),
          spcldscnt:datasheet.cell('AS14').value(),
          spire:datasheet.cell("AS24").value(),
          creditfedtax:datasheet.cell("AS25").value()
        },
        ratings:{
          seer:datasheet.cell("W22").value(),
          afue:datasheet.cell("W24").value(),
          ahri:datasheet.cell("AA28").value(),
          account:datasheet.cell("AA29").value(),
          holder:datasheet.cell("AA30").value()
        },
        additions:[],
        enhancements:[]
      };

      for(let x=5;x<=8;x++){ //Gather Equipment
        if(datasheet.cell('D1'+x).value()!=''){
          tempc.equipment.label.push([datasheet.cell('D1'+x).value()]);
          tempc.equipment.model.push([datasheet.cell('K1'+x).value()]);
        }
      }

      for(let e=32;e<=32+6;e++){ //Read Enhancements
        if(datasheet.row(e).cell(4).value()!=''){
          tempc.enhancements.push({
            name:datasheet.row(e).cell(4).value(),
            notes:datasheet.row(e).cell(11).value(),
            qty:datasheet.row(e).cell(23).value()
          });
        }
      }
      /*
      for(let e=32;e<contract.additions.length;e++){ //Read Additions
        if(datasheet.row(e).cell(28).value()!=''){
          tempc.additions.push({
            name:datasheet.row(e).cell(28).value(),
            notes:datasheet.row(e).cell(35).value(),
            qty:datasheet.row(e).cell(47).value()
          });
        }
      }
      */
      return resolve(tempc);
    });
  });
}

var WRITEexcel=(contract,contractpath,saveAS=false)=>{
  console.log(contract);
  return new Promise((resolve,reject)=>{
    XlsxPop.fromFileAsync(contractpath).then(workbook => {
    var datasheet = workbook.sheet("PDaA");

    /* Job Info */
    datasheet.cell("AS3").value(contract.jobnum),
    datasheet.cell("AJ3").value(contract.strtdate),
    datasheet.cell("T56").value(contract.solddate),
    datasheet.cell("G57").value(contract.cons),

    /* Customer Info */
    datasheet.cell("K9").value(contract.customer.name);
    datasheet.cell("K10").value(contract.customer.street);
    datasheet.cell("K11").value(contract.customer.longcity);
    datasheet.cell("K12").value(contract.customer.phone);
    datasheet.cell("K13").value(contract.customer.email);

    /* System Info */
    datasheet.cell("K28").value(contract.system.name);
    datasheet.cell("K29").value(contract.system.btuheating);
    datasheet.cell("K30").value(contract.system.btucooling);
    datasheet.cell("AQ28").value(contract.system.outlocation);
    datasheet.cell("AQ29").value(contract.system.inlocation);

    /* Financials */
    datasheet.cell('AS11').value(contract.finance.instntdscnt);
    datasheet.cell('AS12').value(contract.finance.ameren);
    datasheet.cell('AS13').value(contract.finance.manf);
    datasheet.cell('AS14').value(contract.finance.spcldscnt);
    datasheet.cell('AS16').value(contract.finance.net);
    datasheet.cell('AS24').value(contract.finance.spire);
    datasheet.cell('AS25').value(contract.finance.creditfedtax);

    /* Ratings */
    datasheet.cell('W22').value(contract.ratings.seer);
    datasheet.cell('W23').value(contract.ratings.eer);
    datasheet.cell('W24').value(contract.ratings.afue);
    datasheet.cell('W25').value(contract.ratings.hspf);
    datasheet.cell('AA28').value(contract.ratings.ahri);
    datasheet.cell('AA29').value(contract.ratings.account);
    datasheet.cell('AA30').value(contract.ratings.holder);

    /* Equipment */

    datasheet.cell('D15').value(contract.equipment.label);
    datasheet.cell('K15').value(contract.equipment.model);
    datasheet.cell("D22").value(contract.equipment.warrlabel);
    datasheet.cell("K22").value(contract.equipment.warrpart);
    datasheet.cell("O22").value(contract.equipment.warrlab);




    for(let i=1;i<9;i++){  //Finds full consultant name using table in contract
      if(contract.cons==workbook.sheet('Lists').row(i).cell(1).value()){
        datasheet.cell("G57").value(workbook.sheet('Lists').row(i).cell(2).value());
      }
    }
    for(let e=0;e<contract.enhancements.length;e++){   //Enhancements loop
      datasheet.row(e+32).cell(4).value(contract.enhancements[e].name);
      datasheet.row(e+32).cell(23).value(contract.enhancements[e].qty);
    }

    if(contract.additions.length>0){   //Checks to see if there are additions before looping through to add to sheet
      if(contract.additions.length<=6){  //Checks to see if there are few enough to fit on the first page
        for(let e=0;e<contract.additions.length;e++){
          if(contract.additions[e].notes==""){
            datasheet.row(e+39).cell(4).value(contract.additions[e].name);
          }else{
            datasheet.row(e+39).cell(4).value(contract.additions[e].notes + " - " + contract.additions[e].name);
          }
          datasheet.row(e+39).cell(47).value(contract.additions[e].qty);
        }
      }else{
        for(let i=59;i<=115;i++){  //Unhides second page
          datasheet.row(i).hidden(false);
        }
        datasheet.row(39).cell(4).style("bold", true).value('*See Next Page for Full List*');
        for(let e=0;e<contract.additions.length;e++){
          if(contract.additions[e].notes==""){
            datasheet.row(e+68).cell(4).value(contract.additions[e].name);
          }else{
            datasheet.row(e+68).cell(4).value(contract.additions[e].notes + " - " + contract.additions[e].name);
          }
          datasheet.row(e+68).cell(47).value(contract.additions[e].qty);
        }
      }
    }

    if(saveAS){return resolve(workbook.toFileAsync(saveAS));}
    else{return resolve(workbook.toFileAsync(contractpath));}
    });
  });
}

module.exports={
  PARSEexcel,
  WRITEexcel,
  CREATEcontract
}
