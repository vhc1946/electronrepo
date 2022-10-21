var japi = require('./japi.js');

var j2vtables = {
  test:{
    jpack:(data)=>{
      return{
        WebMethod:'GJZJ82J',
        Option:'download',
        CompanyCode:'01',
        Template:'WO_HistoryBillingRecap_tbl'
      }
    }
  },
  woheaders:{
    jpack:(data)=>{
      return{
        WebMethod:'GJZJ82J',
        Option:'download',
        CompanyCode:'01',
        Template:'WO_Headers_tbl',
        SELECT:['WorkOrderNumber','CustomerCode','InvoiceNumber','DateCompleted','CostItem','SalesCategoryCode','ReferenceNumber','TechnicianID','TakenBy'],
        WHERE:[{OP:"BETWEEN",DateCompleted:['2022-04-01','2022-09-01']}]
      }
    }
  },
  woinvoicing:{
    jpack:(data)=>{
      return{
        WebMethod:'GJZJ82J',
        Option:'download',
        CompanyCode:'01',
        Template:'WO_InvoiceBillingRecap_tbl'

      }
    }
  },

  wod:{ //use for tech report // pay attention to sorting dates
    jpack:(data)=>{
      let where=[];
      let select=data.params.select!=undefined?data.params.select:[];
      if(data.params!=undefined){
        let params = data.params;
        if(params.CostType!=undefined){where.push({OP:'=',CostType:params.CostType})}
        if(params.fromdate!=undefined&&params.todate!=undefined){where.push({OP:'BETWEEN',PostingDate:[params.fromdate,params.todate]})}
      }
      return{
        WebMethod:'GJZJ82J',
        Option:'download',
        CompanyCode:'01',
        Template:'WO_WODDescription_tbl',
        WHERE:where,
        SELECT:select
      }
    },
    map:(it={})=>{
      if(!it||it==undefined){it={};}
      return{
        Amount: it.Amount!=undefined?it.Amount:0,
        AuditNumber: it.AuditNumber!=undefined?it.AuditNumber:null,
        BillingDate: it.BillingDate!=undefined?it.BillingDate:null,
        CostType: it.CostType!=undefined?it.CostType:'',
        Created: it.Created!=undefined?it.Created:'',
        DepositARCustomerCode: it.DepositARCustomerCode!=undefined?it.DepositARCustomerCode:'',
        EmployeeCode: it.EmployeeCode!=undefined?it.EmployeeCode:null,
        HoursUnits: it.HoursUnits!=undefined?it.HoursUnits:0,
        InvoiceNumber: it.InvoiceNumber!=undefined?it.InvoiceNumber:null,
        JournalType: it.JournalType!=undefined?it.JournalType:null,
        Notes: it.Notes!=undefined?it.Notes:'',
        PostingDate: it.PostingDate!=undefined?it.PostingDate:null,
        ReferenceDescription: it.ReferenceDescription!=undefined?it.ReferenceDescription:'',
        ReferenceNumber: it.ReferenceNumber!=undefined?it.ReferenceNumber:null,
        TypeOfHours: it.TypeOfHours!=undefined?it.TypeOfHours:null,
        WorkOrderNumber: it.WorkOrderNumber!=undefined?it.WorkOrderNumber:null
      }
    }
  },
  woeom:{
    jpack:(data)=>{
      return{
        WebMethod:'GJZJ82J',
        Option:'download',
        CompanyCode:'01',
        Template: 'WO_DetailHistory_tbl'
      }
    }
  },
  wohistory:{
    jpack:(data)=>{
      return{
        WebMethod:'GJZJ82J',
        Option:'download',
        CompanyCode:'01',
        Template:'WO_WorkOrderHistory_tbl'
      }
    }
  }
}

var GETj2vtable = (data,all=true)=>{
  return new Promise((res,rej)=>{
    let resfail = {
      msg:'table not found',
      success:false,
      table:[]
    };
    if(j2vtables[data.table]){
      let params = j2vtables[data.table].jpack(data); //get params
      let map = j2vtables[data.table].map;
      if(params){japi.QUERYtable(params?params:null,map?map:undefined,all).then(result=>{return res(result)});}
      else{return res(resfail);}
    }else{return res(resfail);}
  });
}

module.exports={
  GETj2vtable
}
