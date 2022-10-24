
var {ExcelDateToJSDate} = require('../../tools/box/xltools.js')
/* Service Item File ////////////////////////////////////////////////////////

*////////////////////////////////////////////////////////////////////////////

var awo = (w)=>{
    if(!w || w==undefined){
        w = {};
    }
    return {
        id: w.id || '',
        custCode:w.custCode||'',
        custName:w.custName||'',
        custPhone1:w.custPhone1||'',
        custPhone2:w.custPhone2||'',
        custEmail:w.custEmail||'',
        address:w.address||'',
        createBy:w.createBy||'',
        status:w.status||'',
        callSource:w.callSource||'',
        cat:w.cat||'',
        catDescr:w.catDescr||'',
        dept:w.dept||'',
        jobRef:w.jobRef||'',
        scRef:w.scRef||'',
        woRef:w.woRef||'',
        tech:w.tech||'',
        callDate:w.callDate?ExcelDateToJSDate(w.callDate,false):'',
        callTime:w.callTime||'',
        strtDate:w.strtDate?ExcelDateToJSDate(w.strtDate,false):'',
        strtTime:w.strtTime||'',
    }
}

var vjwomap = (vjwo = null) => {
    if (!vjwo || vjwo==undefined){
        vjwo = {}
    }
    return {
        id: String(vjwo['woNum     ']) || '',
        custCode:vjwo['custCode  ']||'',
        custName:vjwo['custName                           ']||'',
        custPhone1:vjwo['custPhone1     ']&&vjwo['custPhone1     ']!=undefined?String(vjwo['custPhone1     ']):'',
        custPhone2:vjwo['custPhone2     ']&&vjwo['custPhone2     ']!=undefined?String(vjwo['custPhone2     ']):'',
        custEmail:vjwo['custEmail                           ']||'',
        address:vjwo['custAddress                   ']||'',
        salesRep:vjwo['sales']||'',
        createBy:String(vjwo['takenBy '])||'',
        status:vjwo['stat']||'',
        callSource:vjwo['callS'] ||'',
        cat:String(vjwo['woCat          '])||'',
        catDescr:vjwo['woCatDescr                    ']||'',
        dept:String(vjwo['dept      '])||'',
        jobRef:vjwo['jobRef    ']||'',
        scRef:vjwo['scRef     ']||'',
        woRef:vjwo['woRef        ']||'',
        tech:String(vjwo['woTec'])||'',
        callDate:vjwo['callDate']?ExcelDateToJSDate(vjwo['callDate'],false):'',
        callTime:vjwo['callTime  ']||'',
        strtDate:vjwo['strtDate']?ExcelDateToJSDate(vjwo['strtDate'],false):'',
        strtTime:vjwo['strtTime']||'',
        tech:vjwo['tech ']||'',
        woDescr:vjwo['woDescr                                                     ']||''
    }
}

module.exports = {
    awo,
    vjwomap
}
