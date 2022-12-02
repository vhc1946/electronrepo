//  Setup Module ///////////////////////////////////////////////////////////////
var SETUPmodule=(root)=>{
  console.log('Controller Root HAS been declared for vg-dropnote.js')
  ROOT=root;
  for(let x=0;x<stylesheets.length;x++){
    let viewstyles = document.createElement('link');
    viewstyles.setAttribute('rel','stylesheet');
    viewstyles.setAttribute('href',ROOT+stylesheets[x]);
    document.getElementsByTagName('head')[0].prepend(viewstyles);
  }
}

//  PATHS //
var stylesheets = ['gui/styles/modules/vg-dropnote.css'];
var assets={
}

// REPO ROOT //
var ROOT=null;
try{
  SETUPmodule(RROOT);
}catch{console.log('Repo root is not declared')}


var notedom = {
  conts:{ //list of note containers around screen
    tr:'vg-toast-tr', //TopRight
    tl:'vg-toast-tl', //TopLeft
    br:'vg-toast-br', //BottomRight
    bl:'vg-toast-bl' //BottomLeft
  },
  list:{
    cont:'vg-note-list',
    levels:{
      red:'vg-toast-red',
      yellow:'vg-toast-yellow',
      green:'vg-toast-green',
      white:'vg-toast-white'
    }
  },
  button:'toast-close'
}

/* PLACE A NOTE IN NOTIFIER

   cont = tr,tl,br,bl
*/
var DropNote = (cont,message='',level='green',timeout=true)=>{
  let ncont;
  let nlist;
  try{ncont = document.getElementById(notedom.conts[cont]);}
  catch{console.log('NOTIFIER -',cont,'not setup');return}
  try{nlist = ncont.getElementsByClassName(notedom.list.cont)[0];}
  catch{console.log('NOTIFIER not setup');return}

  let note = document.createElement('div');
  note.classList.add(notedom.list.levels[level] || '');
  note.appendChild(document.createElement('div')).innerText = 'X';
  note.lastChild.setAttribute('id',notedom.button);
  note.lastChild.addEventListener('click',(ele)=>{nlist.removeChild(note)});
  note.appendChild(document.createElement('div')).innerText = message;

  nlist.appendChild(note);

  if(timeout){
    setTimeout(()=>{
      try{
        nlist.removeChild(note);
      }catch{}
    },2000);
  }
}

module.exports={
  DropNote
}
