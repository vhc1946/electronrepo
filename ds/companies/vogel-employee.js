var aemployee=(e=null)=>{
  if(!e||e==undefined){e={};}
  return{
    id:e.id||'',
    pswrd:e.pswrd||'',

    fname:e.fname||'',
    lname:e.lname||'',

    email:e.email||'',
    phone:e.phone||'',
    phone2:e.phone2||'',

    company:e.company||'',
    joined:e.joined||'',
    title:e.title||'',
    dept:e.dept||'',
    repto:e.repto||'',
    jdescr:e.jdescr||'',

    bday:e.bday||'',
    intrest:e.intrest||'',
    photo:e.photo||'',

  }
}

module.exports={
  aemployee
}
