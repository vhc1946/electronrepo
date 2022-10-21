var asupportticket=(st=null)=>{
  if(!st||st==undefined){st={}}
  return{
    id:st.id|| '',
    user:st.user||'',
    phone:st.phone||'',
    email:st.email||'',
    dept:st.dept||'',
    problem:st.problem||'',
    goal:st.goal||'',
    attempt:st.attempt||'',
    level:st.level||1,
    type:st.type||'',
    opendate:st.opendate||new Date(),
    closedate:st.closedate||null
  }
}

module.exports={
  asupportticket
}
