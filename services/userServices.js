const userModel=require('../models/users');
const bcrypt= require('bcrypt');


class userServices{
    
    async existingUser(req){
        return userModel.findOne({email:req.body.email});
    }
    
    async hashedPassword(req){
        return bcrypt.hash(req.body.password, 10); 
    }
    
    async result (req, hashedPassword ){
        return userModel.create({ 
        email: req.body.email,
        password: hashedPassword,
        username: req.body.username
    })
    };
    
 async matchPassword(req, existingUser){
        return bcrypt.compare(req.body.password, existingUser.password );
    }

    }
    
    module.exports=  new userServices();