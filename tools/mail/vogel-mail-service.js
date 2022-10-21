
class VGMailer{
  constructor(nm,mailsets){
    this.nodemailer=nm; //object used for mail
    this.transporter; //object used to send

    this.connected=true; //is ready to send

    this.mailsettings = mailsets||null; //mail settings for sending

    this.running=false; //is in the middle of sending
    this.runcnt=0; //how many excpected to send
    this.timer=0; //to help space the sending times
    this.maillog={ //track sending failures and succeses
      fails:[],
      success:[]
    };
    this.lastlog={};
    try{
      this.transporter = this.nodemailer.createTransport({
          service:'Outlook365', // Office 365 server
          port: '587',     // secure SMTP
          tls: {
            ciphers:'SSLv3',
            rejectUnauthorized: false
          },
          auth: this.mailsettings.auth
      });
      this.transporter.verify((err,success)=>{
        if(err){return console.log('Mail Setup Fail: ',err)}
        console.log('Mail Setup..');
        this.connected = true;
      });
    }catch{};
  }

  sendMail=(mailer={},len=0,log=()=>{})=>{
    this.running = true;
    this.runcnt=len;
    if(this.connected){
      setTimeout(()=>{
        this.transporter.sendMail({
          from:this.mailsettings.auth.user ||'',
          to:mailer.to||'',
          subject:mailer.subject||'',
          html:mailer.html||''
        },(err,info)=>{
          if(err){
            this.maillog.fails.push({
              id:mailer.id,
              from:this.mailsettings.auth.user,
              to:mailer.to,
            });
          }else{
            this.maillog.success.push({id:mailer.id,from:this.mailsettings.auth.user,to:mailer.to});
          }
          console.log(this.runcnt);
          console.log(this.maillog);
          if(this.checkProgress(this.runcnt)){
            console.log(this.maillog);
            console.log("REPORT RUN")
            this.timer=0;
            this.running = false
            log(this.maillog);
            this.maillog={
              success:[],
              fails:[]
            }
          }
        });
      },this.timer);
      this.timer+=180; //jumps to stager (want to minimize the time)
    }
  }

  checkProgress=(len)=>{
    if(len == this.maillog.success.length+this.maillog.fails.length){return true}
    return false;
  }
}

module.exports={
  VGMailer
}
