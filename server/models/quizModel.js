const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  optionText: {
    type: String,
  },
  optionUrl: {
    type: String,
  },
  iscorrect: {
    type: Boolean,
  },
  optionSelectedBystudent: {
    type: Number,
    default: 0,
  }
});

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
  },
  optionType: {
    type: String,
  },
  options: [optionSchema],
});

const quizSchema = new mongoose.Schema({
  questions: [questionSchema],
  quizname: {
    type: String,
  },
  timer: {
    type: String,
  },
  quiztype: {
    type: String,
  },
  impressions:{
    type : Number,
    default: 0,
  },
  createdOn:{
    type:Date,
    default:Date.now,
  },
  createdBy:{
    type:String,
  }
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
