
var VAPIhost = 'https://18.191.134.244:5000/'; //'https://localhost:5000/';//

var SENDrequest = (pack,request='mart',url=VAPIhost)=>{
  return new Promise((res,rej)=>{
    let options={
      method:'POST',
      headers:{
        'Accept':'application/json'
      },
      body:JSON.stringify({
        access:{
          user:'VOGCH',
          pswrd:'vogel123',
          coid:'01',
          request:request
        },
        pack:pack
      })
    }
    fetch(url,options)
    .then(response=>{return response.json()})
    .then(data=>{return res(data);})
    .catch(err=>{return res(false);})
  });
}

var SENDrequestapi = (pack,request='mart',url=VAPIhost+'api/')=>{
  return new Promise((res,rej)=>{
    let options={
      method:'POST',
      headers:{
        'Accept':'application/json'
      },
      body:JSON.stringify({
        access:{
          user:'VOGCH',
          pswrd:'vogel123',
          coid:'01',
          request:request
        },
        pack:pack
      })
    }
    fetch(url,options)
    .then(response=>{return response.json()})
    .then(data=>{return res(data);})
    .catch(err=>{return res(false);})
  });
}

var SENDrequestadmin = (pack,request='store',url=VAPIhost+'admin/')=>{
  return new Promise((res,rej)=>{
    let options={
      method:'POST',
      headers:{
        'Accept':'application/json'
      },
      body:JSON.stringify({
        access:{
          user:'VOGCH',
          pswrd:'vogel123',
          coid:'01',
          request:request
        },
        pack:pack
      })
    }
    fetch(url,options)
    .then(response=>{return response.json()})
    .then(data=>{return res(data);})
    .catch(err=>{return res(false);})
  });
}

module.exports={
  VAPIhost,
  SENDrequest,
  SENDrequestapi,
  SENDrequestadmin
}
