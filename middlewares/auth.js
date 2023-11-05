const jwt= require('jsonwebtoken');
const createError = require('../utils.js/error');


const SECRET_KEY= "NOTESAPI";

const auth = (req,res,next)=>{
    
    try{
        let token = req.cookies.jwttoken;
       
        // req.headers.authorization;
        if(token){
            // token=token.split(" ")[1];

            //if token verify it decrypt it and give us the user information in payload
            let user= jwt.verify(token, SECRET_KEY);
            req.userId= user.id;
        
        }
        else{
            // res.status(401).json({message:"Unauthorized User"});
            next(createError(401, "User not authorized" ));
        }

        next();

    }
    catch(error){
        console.log(error);
        // res.status(401).json({message:"Unauthorized User"});
        next(createError(401, error.message));
    }
}

module.exports= auth;