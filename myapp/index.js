// Express文档
// https://expressjs.com/zh-cn/4x/api.html
const Sequelize = require('sequelize');
var config = require('./config');
var express = require('express');
var mariadb = require('mariadb');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var fs = require('fs');
var app = express();

// 创建数据库连接池并测试连接



// Express相关设定
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next) => {
   req.header('Access-Cross-Allow-Origin', '*');
   next();
}); //现在还不知道是干啥用的！！！！！


// 输出测试数据库中的id数量
app.get('/', async (req, res) => {
   let res_string = "欢迎访问Rookie-team，当前有";
   
   await sequelize.query('SELECT COUNT(*) AS count FROM user')
      .then(function (records) {
         res_string += records[0].count;
         res_string += '名用户';
      });

   
   res.send(res_string);
});


app.get('/index', async function (req, res) {
   console.log(req.path);
   console.log(req.query);
   var UserPWD;
   var records;

   await sequelize.query('SELECT UserName, Password FROM user')
      .then(function(UserPW){
         UserPWD=UserPW;
      })

   await sequelize.query('SELECT COUNT(*) AS count FROM user')
      .then(function(record){
         records=record;
      })

   if(req.query.action==='login')
   {
      let name=req.query.username;
      let password=req.query.password;

      // name = crypto.createHash('sha1').update(name).digest('hex');
      // password = crypto.createHash('sha1').update(password).digest('hex');

      // let data=fs.readFileSync('message.txt');
      // let users=data.toString().split('\n');
      // let auth=0;
      // for(let i=0;i<users.length;++i)
      // {
      //    let[usr,pwd]=users[i].split(' ');

      //    if(usr===name&&password===pwd)
      //    {
      //       auth=true;
      //       console.log('登陆成功');
      //       break;
      //    }
      // }
      let auth=0;
      for(let i=0;i<records[0].count;++i)
      {
         if(UserPWD[0]===name&&password===UserPWD)
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
   else if(req.query.action==='register')
   {
      let name=req.query.r_username;
      let pwd=req.query.r_password;
      
      // let sha1_name = crypto.createHash('sha1').update(name).digest('hex');
      // let sha1_pass = crypto.createHash('sha1').update(pwd).digest('hex');
      
      // let content = sha1_name + ' ' + sha1_pass;  // toBase64
      // let content = name + ' ' + pwd;
      // fs.writeFileSync('message.txt',content+'\n',{flag:'a'});;

      await sequelize.query(`INSERT INTO user(UserName,PassWord) VALUES('${name}', '${pwd}')`)
         .catch(err => {
            console.log(err);
         });
      res.send('0');//用户注册成功
      console.log('注册成功');
   }
});

var server = app.listen(8080, function () {

   var host = server.address().address || 'localhost';
   var port = server.address().port;
 
   console.log("应用实例，访问地址为 http://%s:%s", host, port);
 });

//  Sequelize.sync()
//    .then(()=>{
//       var server = app.listen(8080, function () {

//          var host = server.address().address || 'localhost';
//          var port = server.address().port;
       
//          console.log("应用实例，访问地址为 http://%s:%s", host, port);
//        });
//    })


const sequelize = new Sequelize('rookie', config.USER, config.PASSWORD, {
   dialect: 'mariadb',
   host: config.HOST,
});

sequelize.query("SELECT * from user",{ type: sequelize.QueryTypes.SELECT})
   .then(records => {
      for (let i = 0; i < records.length; ++i) {
         let record = records[i];
         console.log(record.UserName,record.PassWord);
      }
   })
   .catch(err => {
      console.log(err);
   });
// (async function () {
//    var pool = await mariadb.createPool({ 
//       host: config.HOST, 
//       user: config.USER, 
//       password: config.PASSWORD,
//       database: "rookie"
//    });
   
   
//    await pool.getConnection()
//       .then(async conn => {
//          console.log("成功连接到数据库");
//          await conn.query("SELECT * from user")  // Query查询
//             .then(records => {
//                for (let i = 0; i < records.length; ++i) {
//                   let record = records[i];
//                   console.log(record.UserName, record['PassWord']);
//                }
//                connection = conn;
//             });
//       })
//       .catch(err => {
//          console.log(err);
//       });
// })();
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });//测试环境是否成功搭建


    const getRandomString = (len = 16) => {
      const buf = crypto.randomBytes(len);
      return buf.toString('hex');
  }//生成随机数

