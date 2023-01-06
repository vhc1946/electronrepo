/**
 * Documentation needed
 */
var fs = require('fs'),
    path = require('path');

//set nav container styles

var writePart=(file,parent,contName = '',id=false,head=false)=>{
  var cont = document.createElement('div');
  if(contName!=''){
    if(id){cont.id = contName}
    else{cont.classList.add(contName)}
  }
  data =fs.readFileSync(file);//,(err,data)=>{
    cont.innerHTML = data;
    if(parent.firstChild!=undefined){
      parent.insertBefore(cont,parent.firstChild);
    }else{parent.appendChild(cont);}
  //});
}

module.exports={
  writePart
}
