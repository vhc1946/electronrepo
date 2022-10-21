

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
