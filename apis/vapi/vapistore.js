var request = require('request');

var SENDrequest = (url,app,pack)=>{
  return new Promise((res,rej)=>{
    var options={
      url:url+`app`,
      method:'GET',
      headers:{
        'Accept':'application/json',
        'Accept-Charset': 'utf-8'
      },
      body:JSON.stringify({
        access:{
          coid:'01',
          app:app,
          user:'VOGCH',
          pswrd:'vogel321'
        },
        pack:pack
      })
    }
    request(options,(err,resp,body)=>{
      if(!err){return res({err:err,data:JSON.parse(body)});}
      else{
        let data = {};
        try{data=JSON.parse(body)}catch{}
        data.success=false
        return res({err:err,data:data});}
    });
  });
}

module.exports={
  SENDrequest
}
