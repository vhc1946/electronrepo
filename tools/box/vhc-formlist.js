var {GETrowTOobject,SETrowFROMobject} = require('../../gui/js/modules/vg-tables.js');

/*
  Constructor()
  cont: the top of the custom list. If the cont is not passed (and that element
        not appended to the document), the constructor will create a container
        and prep its children, but does not append this to the document.
  content: innerHTML to setup the container. The content would exclude the root
           container.
  list: holds the array data reflecting the form
  seleeve: an option to apply function to row click
  rmap: the values to include in row

  Does not load a list to the container, but it will setup everything to that
  point.

  Can add the following properties to create custom rows
  - SETrow([{},{},..]){}
  - GETrow(){return [{},{},..]}
*/
class FormList{
  constructor({
    cont=document.createElement('div'),
    list=[],
    rmap=(r)=>{return r},
    seleeve=()=>{}
  }){
    this.cont=cont;

    if(this.INITcontent()){this.cont.innerHTML=this.INITcontent();}
    this.content=this.cont.innerHTML;

    this.list = list;
    this.rmap = rmap;
    this.sleeve = seleeve;//select event

    if(!this.cont.classList.contains(this.dom.cont)){this.cont.classList.add(this.dom.cont)}

    let ccount=[];
    for(let p in this.dom.parts){//ensure parts
      let set = false;
      let x=0;
      for(x;x<this.cont.children.length;x++){
        if(this.cont.children[x].classList.contains(this.dom.parts[p])){
          set=true;
          break;
        }
      }
      if(!set){
        this[p]=document.createElement('div');
        this[p].classList.add(this.dom.parts[p]);
        this.cont.appendChild(this[p]);
      }else{
        this[p]=this.cont.children[x];
      }
    }
    this.table = cont.getElementsByClassName(this.dom.parts.list)[0];

    this.LOADlist(this.list);
  }

  dom={
    cont:'fl-cont',
    parts:{
      actions:'fl-actions',
      heads:'fl-heads',
      list:'fl-list'
    }
  }

  get form(){
    let rlist = [];
    for(let x=0;x<this.table.children.length;x++){
      rlist.push(this.GETitem(this.table.children[x]));
    }
    return rlist;
  }
  
  set form(rlist=[]){
    this.table.innerHTML='';
    for(let x=0;x<rlist.length;x++){
      this.ADDitem(rlist[x]);
    }
  }

  ADDitem(item={}){
    item=this.rmap(item);
    let row = this.SETrow?this.SETrow(item):SETrowFROMobject(item);
    if(row){this.table.appendChild(row);}
  }
  GETitem(row){
    let item = this.GETrow?this.GETrow(row):GETrowTOobject(row);
    return item;
  }

  LOADlist(list=[]){
    this.table.innerHTML='';
    for(let x=0;x<list.length;x++){
      this.ADDitem(list[x]);
    }
  }
}

module.exports={
  FormList
}
