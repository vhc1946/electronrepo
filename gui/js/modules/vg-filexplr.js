/**
 * Documentation needed
 */
var DrawDirMap=(nmap,elem,filsele)=>{
    elem.classList.add('folder');
    var fold = elem.appendChild(document.createElement('div'))
    fold.innerText = nmap.name; //dir wrapper
    fold.addEventListener('click',hideSub);
    if(nmap.child.length>0){
        var sub = elem.appendChild(document.createElement('div'));
        sub.classList.add('subfolder');
    }
    for(let x=0;x<nmap.child.length;x++){
        var nodn = sub.appendChild(document.createElement('div')); //dir name
        if(nmap.child[x].name){
            DrawDirMap(nmap.child[x],nodn,filsele);
        }else{
          console.log('file')
            nodn.classList.add('file');
            nodn.innerText = nmap.child[x];
            nodn.appendChild(document.createElement('div'));
            nodn.children[0].innerText = nmap.path;
            nodn.addEventListener('dblclick',filsele);
        }
    }
}

var hideSub = (ele)=>{
    let sub = $(ele.target.parentNode.children[1]);
    if(sub.is(':visible')){
        sub.hide();
    }else{sub.show()}
}

module.exports={
  DrawDirMap
}
