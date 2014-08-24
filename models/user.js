var mongodb = require('./db');

function User(user) {
    this.name=user.name;
    this.password=user.password;
    this.email=user.email;
};

module.exports = User;


//storing user information
User.prototype.save=function(callback){
    //Prepare this database user information
    var user = {
        name:this.name,
        password:this.password,
        email:this.email
    };


    //open database
    mongodb.open(function(err,db){
        if(err){
            return callback(err);//return err info;
        }
        //reading  the 'user' collection;
        db.collection('users',function(err,collection){
            if(err){
                db.mongodb.close();
                return callback(err);
            }
            // will is insert collection for user
            collection.insert(user,{safe:true},function(err,user){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null,user[0]);
            });
        })
    });


};//end save()

User.get=function(attr,callback){

    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection("users",function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.findOne(attr,function(err,user){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null,user);//successed,return user info;
            });
        })
    });

};// end get()