const jwt= require('jsonwebtoken');
const SECRET_KEY= "NOTESAPI";

const userServices= require("../services/userServices");

const signup= async (req,res)=>{

    //Existing user check
    //Hashed Password
    //User creation
    //Token generate 

    // const {username, email, password} = req.body;

    try{
        const existingUser= await userServices.existingUser(req); //1

        if(existingUser){
            return res.status(400).json({
                message:"User already exists"
            })
        }

        const hashedPassword = await userServices.hashedPassword(req); //2

        const result = await userServices.result(req, hashedPassword); //3
           

        const token= jwt.sign({email:result.email, id: result._id}, SECRET_KEY,{expiresIn:1200000});
        res.status(201).json({user: result, token: token});

    }
    catch(error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong"});
    }
}

const signin= async (req,res)=>{
    const {email, password} = req.body;

    try{
        const existingUser= await userServices.existingUser(req);

        if(!existingUser){
            return res.status(404).json({
                message:"User not found"
            })
        }

        const matchPassword = await userServices.matchPassword(req, existingUser);

        if(!matchPassword){
            res.status(400).json({message: "Invalid Credentials"})
        }

        const token= jwt.sign({email:existingUser.email, id: existingUser._id}, SECRET_KEY);
        // res.status(201).json({user: existingUser, token: token});

        // console.log(token);

        //store token in cookie
        res.cookie("jwttoken", token, {
            expires: new Date(Date.now()+ 25892000000),
            httpOnly: true
        })
        .status(200)
        .json({user: existingUser, token: token,
            message: "Logged in successfully 😊 👌" });

    }
    catch(error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong"});
    }
}

module.exports= {signup, signin};