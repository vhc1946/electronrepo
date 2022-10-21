
var http = require('http'),
    spauth = require('node-sp-auth'),
    requestprom = require('request-promise');

var url = "https://vogelheating.sharepoint.com/sites/InformationManagement/_api/web" // /lists/getbytitle('files')/items";
var uname = 'christianv@vogelheating.com';
var pswrd = 'racingAM3434';


spauth.getAuth(url,{
    username:uname,
    password:pswrd
})
.then((options)=>{
    var headers = options.headers;
    headers['Accept'] = 'application/json;odata=verbos';

    requestprom.get({
        url: url + "/lists/getbytitle('file')/items",
        headers: headers,
        json:true
    }).then((listresponse)=>{
        console.log(listresponse.d.results);
    });
});
//using authenticated application
spauth.getAuth(url,{
    clientId:'cbf4c1ee-9b58-4179-879d-def09b6361a8',
    clientSecret:'ldARpvVNUQ/00nJBWlMnBCBVGqBslj4hWmtloGPXuWw='
})
.then((options)=>{
    var headers = options.headers;
    headers['Accept'] = 'application/json;odata=verbos';
    headers['Content-Type']='application/json';

    requestprom.get({
        url: url + "/_api/web/GetFolderByServerRelativeUrl('/IM')",
        headers: headers,
        json:true
    }).then((listresponse)=>{

        console.log(listresponse);
    });
});
