/* Display Tools
    This file holds properties/methods to make displaying data easier
*/


var SWAPdivorin=(ele,dtoin=true)=>{
  if(ele){
    if(dtoin){//ele is div
      let val = ele.innerText;
      ele.innerText = '';
      ele.appendChild(document.createElement('INPUT'));
      ele.children[0].value = val;
    }
    else{
      let val = ele.children[0].value;
      console.log(ele.innerHTML)
      ele.innerHTML = '';
      ele.innerText = val;
    }
  }
}

/* FIND parentNode
    Usually used in events to ensure the event belongs to the corrent element
*/
var FINDparentele=(ele,stop)=>{
  if(ele.classList.contains(stop)||ele==document.body){
    if(ele!=document.body){return ele}
    else{return null}
  }else{return FINDparentele(ele.parentNode,stop);}
}

/////////////////////

var SETdatalistFROMarray = (list,dlistname)=>{
  let dele = document.getElementById(dlistname);
  if(dele){
      dele.innerHTML = '';
      for(let it in list){
          dele.appendChild(document.createElement('option')).innerText = list[it] ;
      }
  }else{console.log(dele + ' was not load into data list')}
}

var SETdatalistFROMobject = (list,dlistname)=>{
  let dele = document.getElementById(dlistname);
  if(dele){
      dele.innerHTML = '';
      for(let it in list){
          dele.appendChild(document.createElement('option')).innerText = it ;
      }
  }else{console.log(dele + ' was not load into data list')}
}

/* Set <datalist> for input drop downs //////////////////////////////////
    PASS:
        dlist = object with property names matching the desired list
                property values hold the datalist name
        mlist = list of objects to create data list from

    requires that mlist is an array of objects, and that dlist is an
     object with property names === desired properties in the objects
     of the array. THIS ONLY WORKS with a flat object, where the names
     in dlist are not nested in any way in the array of objects.
    The actual values of dlist (not the property names) are the names
     for the datalist elements to place the list.
*/
var SETdatalistSPC = (mlist, dlists)=>{
    var tlist = []; // array to track unique values for list

    if(dlists){
        for(var dl in dlists){
            tlist[dl] = []; //create an empty array
        }

        for(let x=0; x<mlist.length;x++){
            for(let dl in dlists){
                let y;
                for(y=0;y<tlist[dl].length;y++){
                  if(tlist[dl][y] == mlist[x][dl]){
                      break;
                  }
                }
                if(y == tlist[dl].length ){
                    tlist[dl].push(mlist[x][dl]);
                }
            }
        }
        for(dl in tlist){
            let dele = document.getElementById(dlists[dl]);
            if(dele){
                dele.innerHTML = '';
                for(let x = 0;x<tlist[dl].length;x++){
                    dele.appendChild(document.createElement('option')).innerText = tlist[dl][x];
                }
            }else{console.log(dl + ' was not load into data list')}
        }
    }
}

/* Get <datalist> ///////////////////////////////////////////////////////
    reads the options of a datalist element into an array
*/
var GETdatalist = (dlistname)=>{
    var dlist;
    try{
        let tlist = []; //empty array to hold all list items
        dlist = document.getElementById(dlistname);
        for(let x=0;x<dlist.children.length;x++){
            tlist.push(dlist.children[x].innerText);
        }
        return tlist;
    }
    catch(e){
        return false;
    }
}
/////////////////////////////////////////////////////////////////////////

/* Fill <select> ///////////////////////////////////////////////////////
    fills the <select> tag with options from provided list
    options[{text: text, value: value}]
    //Optional\\
    emptyoption: specify whether a placeholder blank option will be provided as the default
    emptytext: specify the text, if any, given to the blank option
*/
var FILLselect = (select, options=undefined, emptyoption = false, emptytext = "")=>{
    try{
        //Clear select
        select.innerHTML = '';
        //Check for whether adding an empty default option first
        if (emptyoption) {
            var emptyopt = document.createElement('option')
            emptyopt.value = "";
            emptyopt.text = emptytext;
            select.add(emptyopt);
        }
        if (options != undefined) {
            for (let i = 0; i < options.length; i++) {
                var optionel = document.createElement('option');
                //console.log(options[i])
                optionel.text = options[i].text;
                optionel.value = options[i].value;
                select.add(optionel);
            }
        }
        
    }
    catch(e){
        console.log(e)
        return (e, false);
    }
}
/////////////////////////////////////////////////////////////////////////

module.exports = {
  FINDparentele,
  SWAPdivorin,
  SETdatalistFROMarray,
  SETdatalistFROMobject,
  SETdatalistSPC,
  GETdatalist,
  FILLselect
}
