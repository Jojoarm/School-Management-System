const AsyncHandler = require('express-async-handler');
const Exam = require('../../model/Academic/Exam');
const Question = require('../../model/Academic/Questions');

//@desc Create Question
//@route POST /api/questions/:examID
//@acess Private Teachers only
exports.createQuestion = AsyncHandler(async (req, res) => {
  const { question, optionA, optionB, optionC, optionD, correctAnswer } =
    req.body;

  //find the exam
  const examFound = await Exam.findById(req.params.examID);
  if (!examFound) {
    throw new Error('Exam not found');
  }

  //check if question exist
  //   const questionExist = Question.findOne({ question });
  //   if (questionExist) {
  //     throw new Error('Question already exist');
  //   }

  //create question
  const questionCreated = await Question.create({
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correctAnswer,
    createdBy: req.userAuth._id,
  });

  //add question into exam
  examFound.questions.push(questionCreated?._id);

  //save
  await examFound.save();
  res.status(201).json({
    status: 'Success',
    message: 'Question created',
    data: questionCreated,
  });
});

//@desc Get questions
//@route POST /api/questions/:examID
//@acess Private Teachers only
exports.getQuestions = AsyncHandler(async (req, res) => {
  const questions = await Question.find();
  res.status(200).json({
    status: 'Success',
    message: 'Questions fetched successfully',
    data: questions,
  });
});

//@desc Get question
//@route POST /api/questions/:id
//@acess Private Teachers only
exports.getQuestion = AsyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);
  res.status(200).json({
    status: 'Success',
    message: 'Exam fetched successfully',
    data: question,
  });
});

//@desc update question
//@route DELETE /api/v1/questions/:id
//@acess Private Teacher Only
exports.updateQuestion = AsyncHandler(async (req, res) => {
  const { question, optionA, optionB, optionC, optionD, correctAnswer } =
    req.body;

  //check if question exists
  //   const questionFound = await Question.findOne({ question });
  //   if (questionFound) {
  //     throw new Error('Question already exist');
  //   }
  const questionUpdate = await Question.findByIdAndUpdate(
    req.params.id,
    {
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAnswer,
      createdBy: req.userAuth._id,
    },
    { new: true }
  );
  res.status(200).json({
    status: 'Success',
    message: 'Question updated successfully',
    data: questionUpdate,
  });
});

//@desc delete question
//@route DELETE /api/v1/questions/:id
//@acess Private Teacher Only
exports.deleteQuestion = AsyncHandler(async (req, res) => {
  await Question.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'Success',
    message: 'Question deleted successfully',
  });
});
