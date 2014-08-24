/* GET home page. */
module.exports = function(app){

    var account = require('./account');

    var _APP_CONFIG={'site_title':"blog title"};

    app.get("/",function(req,res){
        res.render('index',{ title: '首页',user:req.session.user,APP_CONFIG:_APP_CONFIG});
    });


    app.get("/login", function (req, res) {
        res.render('login', {
            title: '登录',
            APP_CONFIG: _APP_CONFIG,
            user:req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });

    app.get("/reg",function(req,res){
        res.render('reg', {
            title: '注册',
            APP_CONFIG: _APP_CONFIG,
            user:req.session.user,
            success: req.flash('success').toString(),
            error:req.flash('error').toString()
        });
    });

    app.get('/logout',account.logout);
//    console.log(account.login);



    // handle the login infor
    app.post('/login',account.login);
    // handle the registration infor
    app.post('/reg',account.reg);









};
