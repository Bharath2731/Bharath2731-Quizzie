const express = require ('express');

const errorHandler = (error,res)=>{
    console.log(error);
    res.status(500).json({
        status:'failed',
        message:'internal error'
    })
}

module.exports = errorHandler;