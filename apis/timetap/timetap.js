

/* TIME TAP
    https://api.timetap.com/test/sessionToken?apiKey={apiKey}&timestamp={timestamp}&signature={signature}
*/

/* TIME TAP API CALLS /////////////////////////////////////////////////////////////////////////////////////////////

*/
var apikey = '332849';//359877';
var privkey = 'e98daf1bd9304f46895f687e013c7ac5';
var timestamp = Date.now();

var ttsignature  = md5(apikey + privkey);

var mhash= crypto.createHash('md5').update(apikey,privkey).digest('hex'); //md5 hash required


request(`https://api.timetap.com/test/sessionToken?apiKey=${apikey}&timestamp=${timestamp}&signature=${ttsignature}`,(err,res,body)=>{
    var stok = JSON.parse(body).sessionToken;
    console.log(stok);
    request({
        url: 'https://api.timetap.com/test/appointmentList/report',
        headers:{
            'Authorization': `Bearer ${String(stok)}`,
        }
    },(error,resp,bodyy)=>{
        console.log(error)
        console.log(bodyy);
        console.log(3);
    })
});


//call for main process

app.request(`https://api.timetap.com/test/sessionToken?apiKey=${apikey}&timestamp=${timestamp}&signature=${ttsignature}`,(res)=>{
    console.log(res);
});
