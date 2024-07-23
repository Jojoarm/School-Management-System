const express = require('express');
const {
  createProgram,
  getPrograms,
  getProgram,
  updateProgram,
  deleteProgram,
} = require('../../controller/academics/programsCtrl');
const isAdmin = require('../../middlewares/isAdmin');
const isLogin = require('../../middlewares/isLogin');

const programRouter = express.Router();

//create and get program
programRouter
  .route('/')
  .post(isLogin, isAdmin, createProgram)
  .get(isLogin, isAdmin, getPrograms);

//get, update and delete program
programRouter
  .route('/:id')
  .get(isLogin, isAdmin, getProgram)
  .put(isLogin, isAdmin, updateProgram)
  .delete(isLogin, isAdmin, deleteProgram);

module.exports = programRouter;
