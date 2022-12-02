class ObjList{
    constructor(list=null){
        this.list=[]; //pool of referals to work with
        if(list && list!=undefined){ //list passed in
            this.list = list;
        }
    }

    /* Set ist /////////////////////////////////////
        PASSED:
            nlist: outside array of objects
        Sets list to passed nlist, OR if
         passed nothing, slist is emptied.
    */
    SETlist = (nlist)=>{
        if(nlist){
            //additional checks on nlist
            this.list = nlist;
        }else{
            if(nlist != undefined){ //to make sure a failed attempt to pass wasnt made
                this.list = [];
            }
        }
    }
    /* Get srlist /////////////////////////////////////
    */
    GETlist = ()=>{
        if(this.list || this.list!=undefined){
            return this.list;
        }else{return []};
    }
    /* Trim list flts object  //////////////////////////
        PASS:
            - flts = {
                *any properties of the list's objects
            }

        Loops throught the flts object for == matches
         on like prop names.
       RETURN:
       - an array holding the filtered list of objects
    */
    TRIMlist = (flts,soft=false)=>{
      var sortlist = [];
      if(this.list){
        for(let x=0;x<this.list.length;x++){
          let found = true;
          if(flts){
            let fcheck = {};
            for(let f in flts){ //need to make sure ALL flts are honored
              fcheck[f] = false; //create property to track checks
              if(this.list[x][f]!=undefined){
                if(flts[f]!=undefined){
                  if(Array.isArray(flts[f])){ //loop through the array
                    for(let y=0;y<flts[f].length;y++){
                      flts[f][y] = new String(flts[f][y]).toUpperCase();
                      if(String(this.list[x][f]).toUpperCase() == flts[f][y] || String(this.list[x][f]).toUpperCase().contains(flts[f][y])){
                          fcheck[f] = true;
                          break;
                      }
                    }
                  }else{
                    if(String(this.list[x][f]).toUpperCase()==String(flts[f]).toUpperCase() || (soft && String(this.list[x][f]).toUpperCase().includes(String(flts[f]).toUpperCase()))){
                      fcheck[f]=true;
                    }else if(flts[f]==''){fcheck[f]=true;}
                  }
                }else{fcheck[f]=true;}
              }
            }
            for(let fc in fcheck){
                if(!fcheck[fc]){
                    found = false;
                }
            }
          }
          if(found){sortlist.push(this.list[x]);}
        }
      }
      return sortlist;
    }
}

module.exports = {
  ObjList
}
