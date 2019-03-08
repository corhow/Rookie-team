// Express文档
// https://expressjs.com/zh-cn/4x/api.html

var express = require('express');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var fs = require('fs');
var app = express();
 
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));



app.use((req, res, next) => {
   req.header('Access-Cross-Allow-Origin', '*');
   next();
}); //现在还不知道是干啥用的！！！！！

app.get('/index', function (req, res) {
   console.log(req.path);
   console.log(req.query);

   if(req.query.action=='login')
   {
      let name=req.query.username;
      let password=req.query.password;

      // name = crypto.createHash('sha1').update(name).digest('hex');
      // password = crypto.createHash('sha1').update(password).digest('hex');

      let data=fs.readFileSync('message.txt');
      let users=data.toString().split('\n');
      let auth=0;
      for(let i=0;i<users.length;++i)
      {
         let[usr,pwd]=users[i].split(' ');

         if(usr===name&&password===pwd)
         {
            auth=true;
            console.log('登陆成功');
            break;
         }
      }
      if(auth==true)
         res.send('1');//登陆成功
      else
         res.send('2');//用户名或者密码错误
   }
   else if(req.query.action=='register')
   {
      let name=req.query.r_username;
      let pwd=req.query.r_password;
      
      // let sha1_name = crypto.createHash('sha1').update(name).digest('hex');
      // let sha1_pass = crypto.createHash('sha1').update(pwd).digest('hex');
      
      // let content = sha1_name + ' ' + sha1_pass;  // toBase64
      let content = name + ' ' + pwd;
      fs.writeFileSync('message.txt',content+'\n',{flag:'a'});
      res.send('0');//用户注册成功，已经储存至文本
      console.log('注册成功');
   }
});

var server = app.listen(8080, function () {

   var host = server.address().address;
   var port = server.address().port;
 
   console.log("应用实例，访问地址为 http://%s:%s", host, port);
 });

// app.get('/public/photo.jpg', (req, res) => {
//    res.sendfile( __dirname + '/photo.jpg');
// });

// app.get('/*', function (req, res) {
//    res.sendFile( __dirname + "/" + req.path );
// })

// app.post('/register.htm', function (req, res) {

//    if (req.body.name && req.body.pwd && req.body.pwd === req.body.pwd2) {
//       let content = '' + req.body.name + ' ' + req.body.pwd;
//       fs.writeFileSync('message.txt', content /* `${req.body.name} ${req.body.pwd}\n` */, { flag: 'a'} );
//       res.send('用户注册成功');
//    } 
//    else {
//       res.send('不知道为什么出错了');
//    }
   
// });



// app.post('/index.htm', function (req, res) {
//    if(req.body.Way=='User'){
//    if (req.body.name && req.body.pwd) {
//       let data = fs.readFileSync('myapp/message.txt');
//       let users = data.toString().split('\n');
//       for (let i = 0; i < users.length; ++i) {
//          let [usr, pwd] = users[i].split(' ');
//          if (usr === req.body.name && pwd === req.body.pwd) {
//             res.send('用户存在于用户表中，并且密码正确');
//          }
//          else {
//             res.send('用户名或密码错误');
//          }
//       }
//    }
//    else{
//       res.send('又不知道为什么出错了');
//    }}
//    else
//    {
//       if(req.body.name && req.body.pwd){
//          if(req.body.name==10086&&req.body.pwd==10086){
//             // let data = fs.readFileSync('myapp/message.txt');
//             // let users = data.toString().split('\n');
//             // for (let i = 0; i < users.length; ++i){
//             //    let [usr, pwd] = users[i].split(' ');
//             //    res.send(usr);
//             // }
//             res.send('管理员登陆');
//          }
//          else{
//             res.send('管理员密码错误')
//          }
//       }
//       else{
//          res.send('还是不知道为什么错了')
//       }
//    }
//    });



