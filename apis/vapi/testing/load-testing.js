
export var ConcurrentLoop=(times,call)=>{
  let report ={
    name:'CONCURE',
    timein:new Date().getTime(),
    timeout:0,
    calls:{}
  }
  let count=0;
  for (let i=0;i<times;i++){
    let wo = String(Math.floor(Math.random() * 1001) + 2001);
    while(wo.length < 8){
        wo = '0' + wo;
    }
    console.log(wo);
    call(wo).then(
        ticket=>{
          report.calls[wo]=ticket;
          count++
          if(count==times){
            report.timeout=new Date().getTime();
            report.tottime = report.timeout-report.timein;
            console.log(report);
          }
        }
    );
  }
}
export var StaggerLoop=(times,call)=>{
  let report ={
    name:'Stagger',
    timein:new Date().getTime(),
    timeout:0,
    calls:{}
  }
  let count=0;
  let itr=0;
  for (let i=0;i<times;i++){
    let wo = String(Math.floor(Math.random() * 1001) + 2001);
    while(wo.length < 8){
        wo = '0' + wo;
    }
    itr+=2000;
    setTimeout(()=>{
      console.log(wo);
      call(wo).then(
          ticket=>{
            report.calls[wo]=ticket;
            count++
            if(count==times){
              report.timeout=new Date().getTime();
              report.tottime = report.timeout-report.timein;
              console.log(report);
            }
          }
      );
    },itr);
  }

}
