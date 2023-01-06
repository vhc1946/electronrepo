/**
 * Documentation missing - need better directory name if moving to webrepo?
 */
var {asupportticket}=require('./ds-tickets.js');


var SETUPmodule=(root)=>{
    console.log('Controller Root HAS been declared for login.js')
    ROOT=root;
    for(let x=0;x<stylesheets.length;x++){
      let viewstyles = document.createElement('link');
      viewstyles.setAttribute('rel','stylesheet');
      viewstyles.setAttribute('href',ROOT+stylesheets[x]);
      document.getElementsByTagName('head')[0].prepend(viewstyles);
    }
  }

//  PATHS //
  var stylesheets = ['gui/styles/vg-support.css'];
  var assets={
  }
// REPO ROOT //
 var ROOT=null;
 try{
   SETUPmodule(RROOT);
 }catch{console.log('Repo root is not declared')}



var ticdom={
    veil:'support-ticket-veil',
    cont:'support-ticket-cont',
    header:'support-ticket-header',
    input:{
        cont:'support-input-area',
        problem:'support-input-problem',
        goal:'support-input-goal',
        attempt:'support-input-attempt',
        importance:'support-input-importance',
        type:'support-input-type'
    },
    buttons:{
        cont:'support-button-area',
        submit:'support-button-submit',
        close:'support-button-close'
    }

}


var CREATEticket=()=>{
    let v = document.createElement('div');
    v.classList.add(ticdom.veil);
    let box = v.appendChild(document.createElement('div'));
    box.classList.add(ticdom.cont);
    box.appendChild(document.createElement('div'));
    box.lastChild.classList.add(ticdom.header);
    box.lastChild.innerText = 'Support Ticket';

    box.appendChild(ADDinputs());
    box.appendChild(ADDbuttons());
    box.appendChild(ADDdatalist());

    document.getElementsByTagName('body')[0].prepend(v);
}

var ADDinputs=()=>{
    let ins = document.createElement('div');
    ins.classList.add(ticdom.input.cont);
    ins.appendChild(document.createElement('label'));
    ins.lastChild.innerText = 'Problem:';
    ins.appendChild(document.createElement('textarea'));
    ins.lastChild.classList.add(ticdom.input.problem);
    ins.appendChild(document.createElement('label'));
    ins.lastChild.innerText = 'Goal:';
    ins.appendChild(document.createElement('textarea'));
    ins.lastChild.classList.add(ticdom.input.goal);
    ins.appendChild(document.createElement('label'));
    ins.lastChild.innerText = 'Attempt:';
    ins.appendChild(document.createElement('textarea'));
    ins.lastChild.classList.add(ticdom.input.attempt);
    ins.appendChild(document.createElement('label'));
    ins.lastChild.innerText = 'Importance:';
    ins.appendChild(document.createElement('input'));
    ins.lastChild.classList.add(ticdom.input.importance);
    ins.appendChild(document.createElement('label'));
    ins.lastChild.innerText = 'Type:';
    ins.appendChild(document.createElement('input'));
    ins.lastChild.classList.add(ticdom.input.type);
    ins.lastChild.type = 'search';
    ins.lastChild.setAttribute('list', 'ticket-type-list');
    return ins;
}

var ADDbuttons=()=>{
    let butts = document.createElement('div');
    butts.classList.add(ticdom.buttons.cont);
    butts.appendChild(document.createElement('div'));
    butts.lastChild.classList.add('flat-action-button');
    butts.lastChild.innerText = 'Submit';
    butts.lastChild.addEventListener('click', (eve)=>{
        ipcRenderer.send('open-support-ticket',READticket());
    })
    butts.appendChild(document.createElement('div'));
    butts.lastChild.classList.add('flat-action-button');
    butts.lastChild.innerText = 'Close';
    butts.lastChild.addEventListener('click', (eve)=>{
        CLOSEticket();
    });
    return butts;
}

var ADDdatalist=()=>{
    let dl = document.createElement('datalist');
    dl.setAttribute('id', 'ticket-type-list');
    dl.appendChild(document.createElement('option'));
    dl.lastChild.value = 'Bug';
    dl.appendChild(document.createElement('option'));
    dl.lastChild.value = 'Feature';
    dl.appendChild(document.createElement('option'));
    dl.lastChild.value = 'Missing';

    return dl;
}


var READticket=()=>{
    return asupportticket({
      problem:document.getElementsByClassName(ticdom.input.problem)[0].value,
      goal:document.getElementsByClassName(ticdom.input.goal)[0].value,
      attempt:document.getElementsByClassName(ticdom.input.attempt)[0].value,
      level:document.getElementsByClassName(ticdom.input.importance)[0].value,
      type:document.getElementsByClassName(ticdom.input.type)[0].value,
      opendate:new Date(),
    });
}

var CLOSEticket=()=>{
    document.getElementsByClassName(ticdom.veil)[0].remove();
}

////

ipcRenderer.on('open-support-ticket',(eve,data)=>{
  console.log(data)
  if(data.status){
    DropNote('tr',data.msg,'green');
    CLOSEticket();
  }else{DropNote('tr',data.msg,'yellow');}
});

/////

module.exports={
    CREATEticket
  }
