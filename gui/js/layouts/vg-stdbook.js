
/*  STDBOOK
    This is an object that surrounds a dom element with
    2 side nav bars and 1 container in the center holding
    all the views.

    PASSED:
        - nav - object holding all the different elements
                required for this type of view
*/
class stdbook {
    constructor(view = null,nav = null){
        /* VIEW NAV  /////////////////////////////////////
            Function to setup navigation involving two side bars. The end goal
                should be as buttons are clicked, corresponding views are opened.
                As views are opened,the button will move to the other side. The
                buttons will move like pages in a book

            METHOD:
            Loop through all the buttons in the side navs and set a click event
                to each
        */

        this.views = view || {} && console.log('stdbook: bad views');
        this.navbuts = document.getElementsByClassName(nav.sidebuttons) || [] && console.log('stdbook: bad navbutts');

        this.viewbutts = nav.viewbuttons || {} && console.log('stdbook: bad viewbutts');
        this.butsele = nav.sidebuttonsele || ''&& console.log('stdbook: bad butsele');
        this.lnav = nav.left || '' && console.log('stdbook: bad lnav');
        this.rnav = nav.right || '' && console.log('stdbook: bad lnav');

        this.SETnav();
    }

    SETnav =()=>{
        for(let x=0;x<this.navbuts.length;x++){
            this.navbuts[x].addEventListener('click',this.sidenavSelect);
        }
    }

    /*  Side Nav Selector

        Function place in a 'click' event.
        METHOD:
        Accept the element clicked on, find the index of it in the sidenav.
            Use this index to select the corresponding view.

        If the 'parent' of the button is the LEFT side nav
    */
    sidenavSelect = (ele)=>{
        var clkSide = ele.target.parentNode;
        var navbs = clkSide.children;
        var LR; //boolean: TRUE = left side FALSE = right side
        var bcount; //iterator for search
        var found = false;
        var tagged = false;

        /* FIND THE CURRENT VIEW
            if the current view was selected from the
                right side nav, nothing happens. The
                current views button should not be visible
                in the left side nav
        */

        if(clkSide.classList.contains(this.lnav)){
            LR = true;
            // start search at beggining of array and work up
            bcount = 0;
        }else if(clkSide.classList.contains(this.rnav)){
            //make sure that the button selected doesnt equal the current view
            LR = false;
            // start search at end of the array and work down
            bcount = navbs.length-1;
        }else{
            //console.log('NO NAV SELECTED...');
            return;
        }

        while(bcount>=0 && bcount<navbs.length){
            if(navbs[bcount] === ele.target){
                found = true;
            }
            if(!LR){ // placed in front of .hide() so to skip the selected view on the right side nav
                if(found && !tagged){
                    tagged = true;
                }
                bcount--;
            }
            if(found){
                $(navbs[bcount]).hide();
            }
            if(LR){ //placed behind .hide() to hide the selected view in the left side nav
                bcount++;
            }
        }

        this.sidenavAdjust(clkSide,ele.target);
        this.viewSelect(ele.target);
        //loop throught the click on side nav to flip the buttons in the opposite

    }

    sidenavAdjust = (cSide,elem)=>{

        for (let vbname in this.viewbutts){
            let vbs = document.getElementsByClassName(this.viewbutts[vbname]);
            vbs[1].classList.remove(this.butsele);
            if(vbs[0] == elem || vbs[1] ==elem){
                vbs[1].classList.add(this.butsele);
            }
            if(vbs[0].parentNode === cSide){
                if($(vbs[0]).is(":visible")){
                    $(vbs[1]).hide();
                }else{
                    $(vbs[1]).show();
                }
            }else{
                if($(vbs[1]).is(":visible")){
                    $(vbs[0]).hide();
                }else{
                    $(vbs[0]).show();
                }
            }
        }
    }
    viewSelect = (viewButt)=>{
        var found = false;
        for(let v in this.views){
            $(document.getElementById(this.views[v])).hide();
            if(!found){
                for(let x=0;x<viewButt.classList.length;x++){
                    if(viewButt.classList[x].indexOf(v) != -1){ //search for the instance of v
                        $(document.getElementById(this.views[v])).show();
                        found = true;
                        break;
                    }
                }
            }
        }
    }

    PRINTview = ()=>{
      window.print();
    }
}

module.exports = {
    stdbook
}
