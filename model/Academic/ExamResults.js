const mongoose = require('mongoose');
const examResultSchema = new mongoose.Schema(
  {
    studentID: {
      type: String,
      required: true,
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exam',
      required: true,
    },
    grade: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    passMark: {
      type: Number,
      required: true,
      default: 50,
    },
    answeredQuestions: [
      {
        type: Object,
      },
    ],
    //failed/passed
    status: {
      type: String,
      required: true,
      enum: ['Fail', 'Pass'],
      default: 'Fail',
    },
    //excellent/good/poor
    remarks: {
      type: String,
      required: true,
      enum: ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'],
      default: 'Poor',
    },
    // position: {
    //   type: Number,
    //   required: true,
    // },
    classLevel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ClassLevel',
    },
    academicTerm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AcademicTerm',
      required: true,
    },
    academicYear: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AcademicYear',
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//model
const ExamResult = mongoose.model('ExamResult', examResultSchema);

module.exports = ExamResult;
