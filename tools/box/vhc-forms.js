
class VHCform{
  constructor(cont){
    this.cont=cont;
    this.inputs={}
  }

  set form(input={}){
    for(let i in this.inputs){
      try{
        switch(this.inputs[i].tagName){
          case 'INPUT' || 'TEXTAREA':{this.inputs[i].value=input[i]?input[i]:'';break;}
          default:{this.inputs[i].innerText = input[i]?input[i]:'';}
        }
      }catch{console.log(`${i} is not setup in the form`)}
    }
  }
  get form(){
    let fi ={}
    for(let i in this.inputs){
      try{
        switch(this.inputs[i].tagName){
          case 'INPUT' || 'TEXTAREA':{fi[i]=this.inputs[i].value;break;}
          case 'DIV':{fi[i]=this.inputs[i].innerText;break;}
          default:{console.log(`${i} failed to get from form`);}
        }
      }catch{console.log(`${i} failed to get from form`);}
    }
    return fi;
  }

  switch(){}
  validate(){return true}
  submit(){return validate?this.form:null}

  setinputs(inputs){
    for(let i in inputs){
      try{this.inputs[i]=this.cont.getElementsByClassName(inputs[i])[0];}
      catch{console.log(`Class ${i} is not declared in Form ${this.cont} it has been left out of this.inputs`)}
    }
  }
}

module.exports={VHCform}
