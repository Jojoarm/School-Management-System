const express = require('express');
const {
  checkExamResult,
  getAllExamResults,
  adminToggleExamResult,
} = require('../../controller/academics/examResultsCtrl');
const isStudentLogin = require('../../middlewares/isStudentLogin');
const isStudent = require('../../middlewares/isStudent');
const isLogin = require('../../middlewares/isLogin');
const isAdmin = require('../../middlewares/isAdmin');

const examResultsRouter = express.Router();

examResultsRouter.get('/', getAllExamResults);
examResultsRouter.get(
  '/:id/checking',
  isStudentLogin,
  isStudent,
  checkExamResult
);
examResultsRouter.put(
  '/:id/admin-toggle-publish',
  isLogin,
  isAdmin,
  adminToggleExamResult
);

module.exports = examResultsRouter;
