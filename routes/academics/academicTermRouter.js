const express = require('express');
const {
  createAcademicTerm,
  getAcademicTerms,
  getAcademicTerm,
  updateAcademicTerm,
  deleteAcademicTerm,
} = require('../../controller/academics/academicTermCtrl');
const isAdmin = require('../../middlewares/isAdmin');
const isLogin = require('../../middlewares/isLogin');

const academicTermRouter = express.Router();

//create and get academic year
academicTermRouter
  .route('/')
  .post(isLogin, isAdmin, createAcademicTerm)
  .get(isLogin, isAdmin, getAcademicTerms);

//get, update and delete academic year
academicTermRouter
  .route('/:id')
  .get(isLogin, isAdmin, getAcademicTerm)
  .put(isLogin, isAdmin, updateAcademicTerm)
  .delete(isLogin, isAdmin, deleteAcademicTerm);

module.exports = academicTermRouter;
