const express= require('express');
const cookieParser = require('cookie-parser');


const userRouter = require('../routes/userRoutes');
const noteRouter = require('../routes/noteRoutes');
const app= express();

app.use(cookieParser());
app.use(express.json());

//middleware
app.use((req,res,next)=>{
    console.log('HTTP Method- ' + req.method + ", URL- " + req.url);
    next();
});





const mongoose= require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/JwtAuthentication", {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
 console.log('coonected to DB');
})
.catch((err)=>{
    console.log(err)
})


app.use('/users', userRouter);
app.use('/note', noteRouter);


app.get("/", (req,res)=>{
    res.send("Hello");
});

app.listen(5000, ()=>{
    console.log("server started on port no 5000");
});

//errorhandler middleware

app.use((err, req, res, next)=>{
    const errStatus= err.status || 500;
    const errMessage = err.message || 'Something went wrong';
    return res.status(err.status).json({
        success: false,
        status: err.status,
        message: err.message
    });

    next();
})

