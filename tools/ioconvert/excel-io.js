var reader = require('xlsx');
var fs = require('fs')




/*  Standard excel sheet to a json filter

    PASS:
     - epath = path to excel file
     - jpath = path to json file
     - SHname = the sheet to get (default Sheet1)
     - map = a ds for mapping (defualt returns the passed
             object as is)

   *NOTES*
   Need to strengthen this function to account for bad
   variables. for now there is really no validation.
*/
var excelTOjson=(epath,jpath,SHname='Sheet1',map=(m)=>{return m})=>{
  var book = reader.readFile(epath);
  var sh = reader.utils.sheet_to_json(book.Sheets[SHname]);
  var newsh = [];
  for (let x=0;x<sh.length;x++){
      newsh.push(map(sh[x]));
  }
  if(jpath){
    fs.writeFile(jpath,JSON.stringify(newsh),(err)=>{
        if(err){console.log(err)}
        else{console.log('Excel file> ',epath,' HAS uploaded to.. /t','JSON file> ',jpath)}
    });
  }else{return newsh}
}

module.exports={
  excelTOjson
}
