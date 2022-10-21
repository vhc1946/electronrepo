const path = require('path'),
      fs = require('fs');
/* Directory Folder/File Object //////////////////////////////////////

    Represents a point in a directory.
    Like objects can be placed in .children[]
    to link a parent to its children.
*/


var drdom = {
    folder: 'folder',
    subfolder: 'subfolder',
    file: 'file'
}


var dNcs = (dir = null)=>{
    if(!dir){
        dir={};
    }
    return{
        name : dir.name, //Folder/File name
        path : dir.path, //Full path
        child : dir.child || [], //Array holding all children
    }
};


var dmapper = (cdir,pmap)=>{
    pmap.path = cdir;
    let d = fs.readdirSync(pmap.path);
    for(let x=0;x<d.length;x++){
try{
        if(d[x].charAt(0) == '~' ||
           d[x].charAt(0) == '.' ||
           d[x].charAt(0) == '$' || 
           d[x].includes('.sys') || 
           d[x].includes('.dll') ||
           d[x].includes('.js')){ //type exclusions
        }else{
            if(!d[x].includes('.')){
                let td = dNcs();
                td.name = d[x];
                td.path = path.join(pmap.path,'/'+td.name);
                pmap.child.push(td);
                dmapper(td.path,td);
            }else{
                pmap.child.push(d[x]);
            }
        }
}catch{};
    }
}


//  DISPLAY FUNCTIONS   /////////////////////////////

var hideSub = (ele)=>{
    let sub = $(ele.target.parentNode.children[1]);
    if(sub.is(':visible')){
        sub.hide();
    }else{sub.show()}
}


var DrawDirMap = (nmap,elem)=>{
    elem.classList.add(drdom.folder);
    var fold = elem.appendChild(document.createElement('div'))
    fold.innerText = nmap.name; //dir wrapper
    fold.addEventListener('click',hideSub);
    if(nmap.child.length>0){
        var sub = elem.appendChild(document.createElement('div'));
        sub.classList.add(drdom.subfolder);
    }
    for(let x=0;x<nmap.child.length;x++){
        var nodn = sub.appendChild(document.createElement('div')); //dir name
        if(nmap.child[x].name){
            DrawDirMap(nmap.child[x],nodn);
        }else{
            nodn.classList.add(drdom.file);
            nodn.appendChild(document.createElement('div')).innerText = nmap.child[x];
            nodn.appendChild(document.createElement('div'));
            nodn.lastChild.innerText = nmap.path;
        }
    }
}


module.exports = {
    dNcs,
    dmapper,
    DrawDirMap
}