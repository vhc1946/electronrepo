

function ExcelDateToJSDate(date, time = false) {
    try{
        var newdate=null;
        if (date == undefined){return '';}
        if (isNaN(date)){
            try{
                newdate = new Date(date);
                return date;
            }catch{
                return '';
            }
        }else{
            newdate = new Date(Math.round((date - 25569)*86400*1000));
        }
        if (time){
            return newdate.toISOString();
        }else{
            return newdate.toISOString().split('T')[0];
        }
    }catch{
        //Future report flag
        return '';
    }
}

module.exports = {
    ExcelDateToJSDate
}
