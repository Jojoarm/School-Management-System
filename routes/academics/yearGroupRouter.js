const express = require('express');
const {
  createYearGroup,
  getYearGroups,
  getYearGroup,
  updateYearGroup,
  deleteYearGroup,
} = require('../../controller/academics/yearGroupsCtrl');
const isAdmin = require('../../middlewares/isAdmin');
const isLogin = require('../../middlewares/isLogin');

const yearGroupRouter = express.Router();

//create and get year group
yearGroupRouter
  .route('/')
  .post(isLogin, isAdmin, createYearGroup)
  .get(isLogin, isAdmin, getYearGroups);

//get, update and delete program
yearGroupRouter
  .route('/:id')
  .get(isLogin, isAdmin, getYearGroup)
  .put(isLogin, isAdmin, updateYearGroup)
  .delete(isLogin, isAdmin, deleteYearGroup);

module.exports = yearGroupRouter;
