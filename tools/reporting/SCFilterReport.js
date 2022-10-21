/* Report: Service Contract Filter List ////////////////////////////////////////////////////////////////////////////////////////////

    GOAL: Need filter list for specific types of contract holders.

    METHOD: 
        OUTSIDE PROCESS
        1) Pull FLTRS/BLTS (AR Report) from JONAS. Set up the excel sheet with proper headers. Save file where it can be 
            accessed. This provides a service item list (Customer Service Item) per customer.
        2) Pull Service Contract List from JONAS. Set up as excell sheet with proper headers and clean rows. Save file where
            it can be accessed. This provides a list of all service contracts in the system.
        
        INSIDE PROCESS
        3) Read in Service Item List to process.
            - List needs to be read through line by line to create array of objects.
        4) Read in Service Contract List to process
            - Should come in in the order needed, can be parsed to JSON right away
        5) Trim Service Contract List:
            - ACTIVE contracts
            - contracts of a certain type
        6) Take trimmed Service Contract List against the AR Service Item List
            - Search using CUSTOMER CODE
            - build array of objects holding service contract filters/belts
*/



var {ReadCustServiceItem} = require('../toolbox/VCMaster.js'); //tools to work with vogel customers
var {ReadContracts,
     AssignSrvItms} = require('../toolbox/SCMaster'); //tools to work with vogel service contracts

var reader = require('xlsx');


/* Format Filter Report
    Takes a list of service contracts and compresses it
     into an array of single layered objects.
*/
var FormatFilterReport = (scm)=>{
    let list=[];
    let tcm;
    for(let x=0;x<scm.length;x++){
        tcm = {};
        tcm['Contract #'] = scm[x].contid;
        tcm['Status'] = scm[x].status;
        tcm['Type'] = scm[x].type;
        tcm['Cust Code'] = scm[x].customer.id;
        tcm['Name'] = scm[x].customer.name;
        tcm['Street'] = scm[x].customer.address.street;
        tcm['Unit'] = scm[x].customer.address.unit;
        tcm['City'] = scm[x].customer.address.city;
        tcm['Zip'] = scm[x].customer.address.zip;
        
        let itms = scm[x].customer.address.srvitems;
        
        let fltc = 1
        for(let y=0;y<itms.length;y++){
            if(itms[y].fltr1){
                tcm[`Filter ${fltc}`] = itms[y].fltr1;
                tcm[`Filter ${fltc} Count `] = itms[y].fltr1cnt;
                fltc++;
            }
            if(itms[y].fltr2){
                tcm[`Filter ${fltc}`] = itms[y].fltr2;
                tcm[`Filter ${fltc} Count`] = itms[y].fltr2cnt;
                fltc++;
            }
        }
        list.push(tcm);
    }
    return list;
};


/* Run Filter Report to Excel
    PASS:
        - CustFile = Customer File from JONAS, in excel, with service items included
        - CntrctFile = Service Contract file from JONAS, in excel
        - ReportFile = Excel Workbook to write report too, will overwrite
        - ReportName = Name of excel worksheet report will be on (can name existing sheet)
*/
var RunFilterReportXLSX = (CustFile,CntrctFile,ReportFile,ReportName)=>{
    var wb = reader.utils.book_new();
    reader.utils.book_append_sheet(wb,reader.utils.json_to_sheet(FormatFilterReport(AssignSrvItms(ReadCustServiceItem(CustFile),ReadContracts(CntrctFile)))),ReportName);
    reader.writeFile(wb,ReportFile);
}

module.exports = {
    RunFilterReportXLSX
}