var login_form;

window.onload =function(){
    login_form=document.getElementById('login-form');
}

function Reg(){
    login_form.action = '/register.htm';
    login_form.method = 'GET';
    //return true;
}

function Log(){
    login_form.action = '';
    login_form.method = 'POST';
    // login_form.action='';
    return true;
}

function Sure(){
    console.log("准备打开文件！");
    fs.open('message.txt', 'r+', function(err, fd) {
        if (err) {
            return console.error(err);
        }
       console.log("文件打开成功！");     
    });
    fs.writeLine("hello"); 
    fs.close();
    // login_form.action='http://127.0.0.1:8081/index.htm';
}

function Way(){
    if(document.getElementById("user").checked)
        return true;
}