const express = require ('express');
const bodyParser = require ('body-parser');
const mongoose  = require('mongoose');
const User = require('../models/userModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const errorHandler = require('../middlewares/errorhandler')


const router = express.Router();

router.post('/signin',async(req,res)=>{
    try{
        const {name,email,password} = req.body
        const isUserExists = await User.findOne({email})
        if(!isUserExists){
            const encryptedPassword = await bcrypt.hash(password,10)
            const user = await User.create({name,email,password:encryptedPassword})
            console.log(user)
            const jwtoken = jwt.sign(user.toJSON(),process.env.JWT_SECRET_KEY,{expiresIn: 60*60*24})
            res.status(200).json({
                status:'successfull',
                message:'user created successfully',
                jwtoken,
                userData:user,
            })

        }
        else{
            res.status(400).json({
                status:'unsuccessfull',
                message:'user already exists',
            })
        }
        
    }catch (error) {
        console.log(error)
        errorHandler(error,res)
    }
})

router.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body;
        let isValidUser = await User.findOne({email});
        console.log(isValidUser)
        if(isValidUser){
            let isPasswordCorrect = await bcrypt.compare(password,isValidUser.password)
            if(isPasswordCorrect){
                const jwtoken = jwt.sign(isValidUser.toJSON(),process.env.JWT_SECRET_KEY,{expiresIn:60*60*24})
                res.status(200).json({
                    status:'successful',
                    message:'logged in successfully',
                    jwtoken,
                    userData:isValidUser
                })
            }
            else{
                res.status(400).json({
                    status:'error',
                    message: 'incorrect password'
                })
            }
        }
        else{
            res.status(400).json({
                status:'error',
                message:'email doesnot exist'
            })
        }
        
    }catch (error) {
        console.log(error)
        errorHandler(error,res)
    }
})

module.exports= router