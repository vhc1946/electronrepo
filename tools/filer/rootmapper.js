const path = require('path'),
      fs = require('fs');


/* Directory Folder/File Object

    This object represents a poi
    Represents a point in a directory.
    Like objects can be placed in .children[]
        to link a parent to its children.
*/
var dirChild = (n,f,p,c)=>{
    return{
    name : n || '', //Folder/File name
    folder: f || null, //TRUE: is folder || FALSE: is not folder
    path : p || '', //Full path
    children : c || [] //Array holding all children
    }

};
/* DirList
    organizes a directory into a linked list of dir points

    class contains functions to located different points in
     the directory. 

*/
class DirList{

    constructor({name,folder,path,childrn}){
        //create the root dir object
        this.dir = dirChild(name,folder,path,childrn);

        if(fs.existsSync(this.dir.path)){
            MapDrive(this.dir); //map of drive is linked through the .children element
        }else{
            //this.dir.path DOES NOT exist
        }
    }


    /* Creates a map of passed directory
        PASS:
        - pmap = dirChild() as the starting point of directory

        METHOD:
        - takes a starting this.dir object and loops through all
        its children to add them to the property .children[].
        For each .children[x], MapDrive is called again. The 
        .children[x].childrens' are discovered, and so on until
        it finds no children and err in fs.readdir() returns true.
        */
    MapDrive = (pmap)=>{
        fs.readdir(pmap.path,(err, fst)=>{
            if(err){
            }else{
                console.log(fst);
                fst.forEach(f=>{
                    pmap.children.push(dirChild(f,path.join(pmap.path, '/'+ f ),[]));
                    MapDrive(pmap.children[pmap.children.length -1]);
                });
            }
        });
    }


}

//  Client Side ////////////////////////////////////////////////////////////////////////
/* Draw a directory map and add it to the dom

    Pass:
        - nmap = Class DirList.dir <=

    Function is brought in on the client side to draw a map to be displayed
*/
function DrawDirMap(nmap,elem,{folder,file}){
    elem.appendChild(document.createElement('div')); //create container for folder/file

    nmap.ele = document.createElement('div');//attach a div to the map node

    /* Identifies a folder or file
        if nmap.folder is set, it assigns the correct style class passed
        if nmap.folder is not set, the default is to add the folder style class
    */
    if(nmap.folder && nmap.folder){
        nmap.ele.classList.add(folder || ''); //set node type
    }else if (!nmap.folder){
        nmap.ele.classList.add(file || '');
    }else{
        nmap.ele.classList.add(folder || '');
    }

    elem.querySelector('div').appendChild(nmap.ele); //add node to container

    nmap.ele.appendChild(document.createElement('h4')).innerText = nmap.name; //display node name
    nmap.ele.querySelector('h4').addEventListener('click',hidechild); //add hide/show to node

    nmap.children.forEach(ch => {//create nodes for all children of this node
        DrawDirMap(ch,nmap.ele,{folder: folder, file: file}); 
    });
}

/* Private function to hide/show folder contents

    PASS:
        -ele = element to be hidden/shown

    Function gets assigned to a 'click' event of a folder element
*/
function hidechild(ele){
    console.log(ele.target.parentNode);
    let pdele = ele.target.parentNode.parentNode;
    console.log(pdele);
    
    let dele = $(ele.target.parentNode.querySelector('div'));
    let v;
    if(dele.is(':hidden')){
        v = true;
    }else{
        v = false;

    }
    for(x=0;x<pdele.children.length;x++){
        let tele = $(pdele.children[x].querySelector('div'));
        tele.hide();
        //if(tele.is(':hidden')){
        //    tele.
        //}
    }
    if(v){
        dele.show();
    }else{
        dele.hide();

    }
}


module.exports = {
    DirList,
    DrawDirmap
}