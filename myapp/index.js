// Express文档
// https://expressjs.com/zh-cn/4x/api.html

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
 
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/public/photo.jpg', (req, res) => {
//    res.sendfile( __dirname + '/photo.jpg');
// });

// app.get('/*', function (req, res) {
//    res.sendFile( __dirname + "/" + req.path );
// })

app.post('/register.htm', function (req, res) {

   if (req.body.name && req.body.pwd && req.body.pwd === req.body.pwd2) {
      let content = '' + req.body.name + ' ' + req.body.pwd;
      fs.writeFileSync('message.txt', content /* `${req.body.name} ${req.body.pwd}\n` */, { flag: 'a'} );
      res.send('用户注册成功');
   } 
   else {
      res.send('不知道为什么出错了');
   }
   
});

app.get('index', function (req, res) {
   console.log(req.path);
   console.log(req.query);
});

app.post('/index.htm', function (req, res) {
   if(req.body.Way=='User'){
   if (req.body.name && req.body.pwd) {
      let data = fs.readFileSync('myapp/message.txt');
      let users = data.toString().split('\n');
      for (let i = 0; i < users.length; ++i) {
         let [usr, pwd] = users[i].split(' ');
         if (usr === req.body.name && pwd === req.body.pwd) {
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
   else
   {
      if(req.body.name && req.body.pwd){
         if(req.body.name==10086&&req.body.pwd==10086){
            // let data = fs.readFileSync('myapp/message.txt');
            // let users = data.toString().split('\n');
            // for (let i = 0; i < users.length; ++i){
            //    let [usr, pwd] = users[i].split(' ');
            //    res.send(usr);
            // }
            res.send('管理员登陆');
         }
         else{
            res.send('管理员密码错误')
         }
      }
      else{
         res.send('还是不知道为什么错了')
      }
   }
   });


var server = app.listen(8080, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("应用实例，访问地址为 http://%s:%s", host, port);
});


// fetch("http://localhost:8080/index?action=" + this.state.action
//         +"&username="+formData.username+"&password="+formData.password
//         +"&r_username=" + formData.r_username + "&r_password="
//         + formData.r_password + "&r_confirmPassword="
// + formData.r_confirmPassword, myFetchOptions)
// .then(response => 
// {
// return response.json();
// }) 
//         .then(
// json => {
// this.setState({userid: json.UserId});
// localStorage.username=json.UserName;
// localStorage.userid=json.UserId;
// //console.log(json);
// if(UserId==0)message.error("密码或用户名错误！")//如果id为0就错误
// // console.log(response);
// else message.success("请求成功！");
// });//