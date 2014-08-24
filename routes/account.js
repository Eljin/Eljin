var crypto=require('crypto'),
    User=require('../models/user');
module.exports={
    login:function(req,res){

        var account = req.body.account;
        //MD5 value generated password
        var md5 = crypto.createHash('md5'),
            password = md5.update(account.password).digest('hex');

        User.get({email:account.email},function(err,user){

            if(!user){
                req.flash('error','用户名不存在!');
                return res.redirect('/login');
            }
            if(user.password!=password){
                req.flash('error','密码错误!');
                return res.redirect('/login');
            }
            req.session.user=user;
            req.flash('success','登录成功!');
            res.redirect('/');
        });


    },
    logout:function(req,res){
        req.session.user=null;
        req.flash('success','登出成功!');
        res.redirect('/');
    },
    reg:function(req,res){

        var account = req.body.account;

        //Check whether the user input password twice
        if(account.password!==account.password_repeat){
            req.flash('error','两次输入的密码不一致！');
            return res.redirect('/reg');
        }

        //MD5 value generated password
        var md5 = crypto.createHash('md5'),
            password = md5.update(account.password).digest('hex');

        var newUser = new User({name:account.name,password:password,email:account.email});

        //Check whether the user name already exists
        User.get({name:newUser.name},function(err,user){
            if(user){
                req.flash('error','用户已存在');
                return res.redirect('/reg');
            }
            newUser.save(function(err,user){
                if(err){
                    req.flash('error',err);
                    return req.redirect('/reg');
                }
                req.session.user=user;
                req.flash('success','注册成功！');
                console.log('注册成功！');
                res.redirect('/');
            });
        });


    }
};

