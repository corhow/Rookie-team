var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

app.get('/*', function (req, res) {
    res.sendFile( __dirname + "/" + req.path );
 })
 
 app.get('/register.htm', function (req, res) {
    if(req.query.action=='register'){
    if (req.query.r_username && req.query.r_password && req.query.r_password === req.query.r_password) {
       let content = '' + req.query.r_username + ' ' + req.query.r_password;
       fs.writeFileSync('message.txt', content , { flag: 'a'} );
       res.send('用户注册成功');
    } 
    else {
       res.send('不知道为什么出错了');
    }
   }
    
 });
 
 app.get('/index.htm', function (req, res) {
    if(req.query.action=='login'){
    if (req.query.username && req.query.password) {
       let data = fs.readFileSync('myapp/message.txt');
       let users = data.toString().split('\n');
       for (let i = 0; i < users.length; ++i) {
          let [usr, password] = users[i].split(' ');
          if (usr === req.query.username && password === req.query.password) {
             res.send('用户存在于用户表中，并且密码正确');
          }
          else {
             res.send('用户名或密码错误');
          }
       }
    }
    else{
       res.send('又不知道为什么出错了');
    }}
   //  else
   //  {
   //     if(req.query.username && req.query.password){
   //        if(req.query.username==10086&&req.query.password==10086){
   //           // let data = fs.readFileSync('myapp/message.txt');
   //           // let users = data.toString().split('\n');
   //           // for (let i = 0; i < users.length; ++i){
   //           //    let [usr, pwd] = users[i].split(' ');
   //           //    res.send(usr);
   //           // }
   //           res.send('管理员登陆');
   //        }
   //        else{
   //           res.send('管理员密码错误')
   //        }
   //     }
   //     else{
   //        res.send('还是不知道为什么错了')
   //     }
   //  }
    });
 
 
 var server = app.listen(8081, function () {
 
   var host = server.address().address;
   var port = server.address().port;
 
   console.log("应用实例，访问地址为 http://%s:%s", host, port);
 });