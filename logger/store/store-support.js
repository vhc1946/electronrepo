var path = require('path');
var Datastore = require('nedb');



var logdirs = {
  support:'IMDB/logs/appsupport.db'
}

class SupportLog {
  constructor(rootpath){
    this.db = new Datastore({
      filename:path.join(rootpath,logdirs.support),
      timestampData:true,
      autoload:true
    });
    this.QUERYdb({}).then((res)=>{console.log('SUPPORT TICKETS>',res)})
  }

  QUERYdb=(flts={})=>{
    return new Promise((resolve,reject)=>{
      this.db.find(flts,(err,docs)=>{
        if(err){return resolve(null)}
        else if(docs){return resolve(docs)}
        else{return resolve([])}
      });
    });
  }

  UPDATEdb=(query={},update={},options={})=>{
    return new Promise((resolve,reject)=>{
      this.db.update(query,update,options,(err,numrep)=>{
        if(numrep>0){resolve({numrep:numrep,err:null})}
        else{resolve({numrep:numrep,err:err})}
      });
    })
  }

  INSERTdb=(doc=null)=>{
    return new Promise((resolve,reject)=>{
      if(doc&&path){
        this.db.insert(doc,(err,doc)=>{
          if(doc){resolve({doc:doc,err:null})}
          else{resolove({doc:null,err:err})}
        });
      }
    });
  }

  REMOVEdoc=(query={},multi=false)=>{
    return new Promise((resolve,reject)=>{
      this.db.remove(query,{multi:multi},(err,num)=>{
        if(!err){return resolve(true);
        }else{return resolve(false);}
      });
    });
  }
}

module.exports={
  SupportLog
}
