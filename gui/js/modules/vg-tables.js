//  Setup Module ///////////////////////////////////////////////////////////////
var SETUPmodule=(root)=>{
  console.log('Controller Root HAS been declared for vg-tables.js')
  ROOT=root;
  for(let x=0;x<stylesheets.length;x++){
    let viewstyles = document.createElement('link');
    viewstyles.setAttribute('rel','stylesheet');
    viewstyles.setAttribute('href',ROOT+stylesheets[x]);
    document.getElementsByTagName('head')[0].prepend(viewstyles);
  }
}

//  PATHS //
var stylesheets = ['gui/styles/modules/vg-tables.css'];
var assets={
}

// REPO ROOT //
var ROOT=null;
try{
  SETUPmodule(RROOT);
}catch{console.log('Repo root is not declared')}

var gtdom={
  table:'vg-gentable',
  header:'vg-gentable-header'
}

var OPENquotepreview=(row)=>{
  let pcont = document.getElementById(qddom.preview.cont);
  $(pcont).show();

}

var BUILDintable=(list,cont,header=false,rowclass=false,map=(obj)=>{return obj},eve=()=>{})=>{
  cont.appendChild(SETrowFROMobject(map(list[0]),false,eve));
  if(header){cont.lastChild.classList.add(rowclass,gtdom.header)}
  for(let x=1;x<list.length;x++){// financing
    cont.appendChild(SETrowFROMobject(map(list[x]),true,eve));
    if(rowclass){cont.lastChild.classList.add(rowclass)}
    cont.lastChild.addEventListener('click',(ele)=>{
      eve(list[x]);
    });
  }
}
var BUILDdistable=(list,cont,header=false,rowclass=false,map=(obj)=>{return obj},eve=()=>{})=>{
  cont.innerHTML='';
  cont.appendChild(SETrowFROMobject(map(list[0]),false));
  if(header){cont.lastChild.classList.add(rowclass,gtdom.header)}
  for(let x=1;x<list.length;x++){// financing
    cont.appendChild(SETrowFROMobject(map(list[x]),false));
    if(rowclass){cont.lastChild.classList.add(rowclass)}
    cont.lastChild.addEventListener('click',(ele)=>{
      eve(list[x]);
    });
  }
}
var BUILDtruetable=(list,cont,header=false,rowclass=false,map=(obj)=>{return obj})=>{
  cont.innerHTML='';
  let table = cont.appendChild(document.createElement('table'));
  table.appendChild(SETtablerowFROMobject(map(list[0]),false));
  if(header){table.lastChild.classList.add(rowclass,'vg-gentable-header')}
  for(let x=1;x<list.length;x++){
    table.appendChild(SETtablerowFROMobject(map(list[x]),false));
    if(rowclass){table.lastChild.classList.add(rowclass)}
  }
}
var READintable=(cont)=>{
  let list=[];
  list.push(GETrowTOobject(cont[0],false));
  for(let x=1;x<cont.length;x++){
    list.push(GETrowTOobject(cont[x],true));
  }
  return list;
}

var FINDrowindex=(rows,row)=>{
  for(let x=0;x<rows.length;x++){
    if(rows[x]==row){return x;}
  }
}
//  placing

var SETrowFROMobject=(obj,inn=false)=>{
  let row = document.createElement('div');
  for(let o in obj){
    if(o!=''){
      if(inn){
        row.appendChild(document.createElement('input'));
        row.lastChild.value = obj[o];
      }else{
        row.appendChild(document.createElement('div'));
        row.lastChild.innerText = obj[o];
      }
      row.lastChild.title = o;
    }
  }
  return row;
}

var SETtablerowFROMobject=(obj)=>{
  let row = document.createElement('tr');
  for(let o in obj){
    if(o!=''){
      row.appendChild(document.createElement('td'));
      row.lastChild.innerText = obj[o];
    }
    row.lastChild.title = o;
  }
  return row;
}





/* GENERIC row reader
    takes a row with <div> as children
    uses the 'title' attribute as object.property name
    takes the <div>.innerText as object.property value

    returns the object
    if there are no children, null is returned
*/
var GETrowTOobject=(row,inn=false)=>{
  let obj = {};
  if(row.children.length>0){
    for(let x=0;x<row.children.length;x++){
      obj[row.children[x].title] = inn?row.children[x].value:row.children[x].innerText;
    }
  }else{return null}
  return obj;
}

module.exports={
  gtdom,
  BUILDintable,
  BUILDdistable,
  BUILDtruetable,

  READintable,
  FINDrowindex,
  SETrowFROMobject,
  GETrowTOobject
}
