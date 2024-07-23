const express = require('express');
const {
  createSubject,
  getSubjects,
  getSubject,
  updateSubject,
  deleteSubject,
} = require('../../controller/academics/subjectsCtrl');
const isAdmin = require('../../middlewares/isAdmin');
const isLogin = require('../../middlewares/isLogin');

const subjectRouter = express.Router();

//createsubject
subjectRouter.post('/:programID', isLogin, isAdmin, createSubject);

//get subjects
subjectRouter.get('/', isLogin, isAdmin, getSubjects);

//get, update and delete subject
subjectRouter
  .route('/:id')
  .get(isLogin, isAdmin, getSubject)
  .put(isLogin, isAdmin, updateSubject)
  .delete(isLogin, isAdmin, deleteSubject);

module.exports = subjectRouter;
