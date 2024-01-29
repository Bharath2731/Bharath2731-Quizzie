const express = require('express');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const mongoose = require ('mongoose');
const jwt = require ('jsonwebtoken');
const cors = require('cors');
const bodyParse = require('body-parser');
dotenv.config()

const registerRoutes = require('./routes/registerRoutes')
const quizRoutes = require('./routes/quizRoutes')

const app = express();
// app.use(bodyParse.urlencoded({extended:false}));
app.use(bodyParse.json());
app.use(express.json())
app.use(cors());



app.get('/',(req,res)=>{
    res.status(200).json({
        status:'successful',
        message:'server is up and ready',
        time : new Date()
    })
})
app.use(registerRoutes)
app.use(quizRoutes)

app.listen(process.env.PORT,()=>{
    mongoose
    .connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log(`server is running at http://localhost:${process.env.port}`)
    })
    .catch(error=>console.log(error))
})