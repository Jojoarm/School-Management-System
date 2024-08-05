const express = require('express');
const isTeacherLogin = require('../../middlewares/isTeacherLogin');
const isTeacher = require('../../middlewares/isTeacher');
const {
  createQuestion,
  getQuestions,
  getQuestion,
  updateQuestion,
  deleteQuestion,
} = require('../../controller/academics/questionsCtrl');

const questionsRouter = express.Router();

questionsRouter.post('/:examID', isTeacherLogin, isTeacher, createQuestion);
questionsRouter.get('/', isTeacherLogin, isTeacher, getQuestions);
questionsRouter.get('/:id', isTeacherLogin, isTeacher, getQuestion);
questionsRouter.put('/:id', isTeacherLogin, isTeacher, updateQuestion);
questionsRouter.delete('/:id', isTeacherLogin, isTeacher, deleteQuestion);

module.exports = questionsRouter;
