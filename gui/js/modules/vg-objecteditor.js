

var oedom = {
  isvar:'edit-var',
  isobject:'edit-object',
  isarray:'edit-array',
  arraylist:'edit-array-list'
}

//Load item to editor
var LOADedit = (obj,editor)=>{
  editor.innerHTML='';
  LOADeditvar(obj,editor); // looad the object into the editor container
}

var LOADeditvar = (obj,cont)=>{
  for(let o in obj){ //loop through the passed object
    let obele = document.createElement('div'); //create the variable container
    if(Array.isArray(obj[o])){//is array
      obele.classList.add(oedom.isarray); //give array class name
      obele.appendChild(document.createElement('div'));
      obele.lastChild.innerText = o; //variable name for array
      obele.lastChild.addEventListener('click',(ele)=>{
        if(ele.target.tagName != 'input'){
          if($(ele.target.parentNode.lastChild).is(':visible')){
            $(ele.target.parentNode.lastChild).hide();
          }else{$(ele.target.parentNode.lastChild).show()}
        }
      });
      obele.appendChild(document.createElement('div')); //array add button
      obele.lastChild.innerText = '+';
      var additem=(ele)=>{
        let list = ele.target.parentNode.lastChild;
        if(list.children.length==0){
          list.appendChild(document.createElement('input'));
        }else{
          $(list.lastChild).clone(true).appendTo(list);
          $(list.lastChild.lastChild).show();
        }
      }
      obele.lastChild.addEventListener('click',additem);
      obele.appendChild(document.createElement('div'));
      obele.lastChild.classList.add(oedom.arraylist); //array list container
      if(obj[o].length==0){obele.lastChild.appendChild(document.createElement('input'));}
      for(let y=0;y<obj[o].length;y++){ //loop through array
        if(typeof obj[o][y] == 'object'){ //if array element is an object
          obele.lastChild.appendChild(document.createElement('div'));
          CREATEobjectcontainer(y,obele.lastChild.lastChild);
          LOADeditvar(obj[o][y],obele.lastChild.lastChild.lastChild);
        }else{ //add array variable
          obele.lastChild.appendChild(document.createElement('input'));
          obele.lastChild.lastChild.value = obj[o][y];
        }
      }
      //$(obele.lastChild).hide(); //optional array collapse

    }else if(typeof obj[o] == 'object'){
      CREATEobjectcontainer(o,obele);
      LOADeditvar(obj[o],obele.lastChild);
    }else{
      obele.classList.add(oedom.isvar);
      obele.appendChild(document.createElement('div'))
      obele.lastChild.innerText = o;
      obele.appendChild(document.createElement('input'));
      obele.lastChild.value = obj[o];
    }
    cont.appendChild(obele);
  }
}

var CREATEobjectcontainer=(name,cont)=>{
  cont.classList.add(oedom.isobject); //give object class name
  cont.appendChild(document.createElement('div'));
  cont.lastChild.innerText = name;
  cont.lastChild.addEventListener('click',(ele)=>{
    if(ele.target.tagName != 'input'){
      if($(ele.target.parentNode.lastChild).is(':visible')){
        $(ele.target.parentNode.lastChild).hide();
      }else{$(ele.target.parentNode.lastChild).show()}
    }
  });
  cont.appendChild(document.createElement('div'));
  //$(cont.lastChild).hide(); //optional collapse object
}

//Get item from editor
var GETedit = (editor,newobj=false)=>{
  var obj = GETeditobject({},editor);
  if(newobj){
    obj['_id']=undefined;
  }
  return obj;
}

var GETeditobject=(obj,varlist)=>{
  for(let x=0;x<varlist.children.length;x++){
    let varele = varlist.children[x];
    if(varele.classList.contains(oedom.isvar)){ //is variable
      obj[varele.firstChild.innerText]=varele.lastChild.value;
    }else if(varele.classList.contains(oedom.isarray)){ //is array
      let list = varele.getElementsByClassName(oedom.arraylist)[0].children;
      obj[varele.firstChild.innerText]=[]; //set empty array
      for(let y=0;y<list.length;y++){
        if(list[y].tagName=='INPUT'){
          if(list[y].value!=''){obj[varele.firstChild.innerText].push(list[y].value);}
        }else{obj[varele.firstChild.innerText].push(GETeditobject({},list[y].lastChild));}
      }
    }else if(varele.classList.contains(oedom.isobject)){ //is object
      obj[varele.firstChild.innerText] = GETeditobject({},varele.lastChild); //drill into that objects elements
    }
  }
  return obj
}


module.exports={
  LOADedit,
  GETedit
}
