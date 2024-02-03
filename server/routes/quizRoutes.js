const express = require ('express');
const mongoose  = require('mongoose');
const Quiz = require('../models/quizModel');
const dotenv = require('dotenv')
dotenv.config()

const isUserAuthorized = require('../middlewares/isUserAutorized')

const router = express.Router();

router.post('/quiz',isUserAuthorized,async(req,res)=>{
    const quizInfo = req.body;
    console.log(quizInfo)
    try {
        const createdQuiz = await Quiz.create(quizInfo)
        res.status(200).json({
            status:'successful',
            message:'quiz created successfully',
            quizId :createdQuiz._id,
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status:'unsuccessfull',
            message:'failed to create quiz',
        })
    }

})

router.get('/quizes',isUserAuthorized,async(req,res)=>{
    const {email} = req.body.user
    try {
        const quizes = await Quiz.find({createdBy:email})
        res.status(200).json({
            status:'successful',
            message:'quizes retrived successfully',
            quizes,
        })
    } catch (error) {
        res.status(400).json({
            status:'unsuccessfull',
            message:'failed to fetch quizes',
        })
    }
})
router.get('/quizes/analytics', isUserAuthorized, async (req, res) => {
    const { email } = req.body.user;

    try {
        // Fetch quizzes sorted by createdOn in descending order
        const quizes = await Quiz.find({ createdBy: email })
            .sort({ createdOn: 1 });

        res.status(200).json({
            status: 'successful',
            message: 'quizes retrieved successfully',
            quizes,
        });
    } catch (error) {
        res.status(400).json({
            status: 'unsuccessful',
            message: 'failed to fetch quizes',
        });
    }
});

router.get('/quizes/trending', isUserAuthorized, async (req, res) => {
    const { email } = req.body.user;

    try {
        //  quizzes sorted by impressions in descending order
        //  filter quizzes where impressions are above 10
        const quizes = await Quiz.find({ createdBy: email, impressions: { $gt: 10 } })
            .sort({ impressions: -1 });

        res.status(200).json({
            status: 'successful',
            message: 'quizes retrieved successfully',
            quizes,
        });
    } catch (error) {
        res.status(400).json({
            status: 'unsuccessful',
            message: 'failed to fetch quizes',
        });
    }
});


router.get('/quiz/:id',async(req,res)=>{
    const {id} = req.params;
    try {
        const quiz = await Quiz.findById(id);
        res.status(200).json({
            status:'successful',
            message:'quiz retrived successfully',
            quiz,
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status:'unsuccessfull',
            message:'failed to fetch quiz',
        })
    }
})

router.delete('/quiz/:id',isUserAuthorized,async(req,res)=>{
    const { id } = req.params;
    try {
        const deletedQuiz =await Quiz.findByIdAndDelete(id);
        res.status(200).json({
            status: 'successful',
            message: 'Quiz deleted successfully.',
          })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            status: 'error',
            message: 'unable to delete Quiz',
        });
    }

})

//not private route because everyone should access it
router.put('/quiz/impressions/:id',async(req,res)=>{
    const {id}= req.params;
    try {
        await Quiz.findByIdAndUpdate(id, { $inc: { impressions: 1 } });
        res.status(200).json({
            status:'successfull',
            message:'updated impressions',
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            status: 'error',
            message: 'unable to update impressiosn',
        });
    }
})

router.put('/quiz/submit/:id',async(req,res)=>{
    const {id} = req.params;
    try {
        const quizData =req.body
        // because if i include impression it updates the database impression with this impressions
        delete quizData.impressions;
        // const { impressions, ...quizDataToUpdate } = req.body;
        const updatedQuiz = await Quiz.findByIdAndUpdate(id, quizData, { new: true });
        res.status(200).json({
            status:'successful',
            message:'submitted quiz updated',
            updatedQuiz
        })
        
    } catch (error) {
        console.error(error);
        res.status(400).json({
            status: 'error',
            message: 'unable to update impressiosn',
        }); 
    }
})
router.put('/quiz/edit/:id',isUserAuthorized,async(req,res)=>{
    const {id} = req.params;
    try {
        const quiz =req.body
        const updatedQuiz = await Quiz.findByIdAndUpdate(id, quiz, { new: true });
        res.status(200).json({
            status:'successful',
            message:'submitted quiz updated',
            updatedQuiz
        })
        
    } catch (error) {
        console.error(error);
        res.status(400).json({
            status: 'error',
            message: 'unable to update impressiosn',
        }); 
    }
})


module.exports = router