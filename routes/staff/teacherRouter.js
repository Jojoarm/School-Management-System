const express = require('express');
const isLogin = require('../../middlewares/isLogin');
const isAdmin = require('../../middlewares/isAdmin');
const {
  adminRegisterTeacher,
  loginTeacher,
  getAllTeachersAdmin,
  getTeacherByAdmin,
  getTeacherProfile,
  teacherUpdateProfile,
  adminUpdateTeacher,
} = require('../../controller/staff/teacherCtrl');
const isTeacherLogin = require('../../middlewares/isTeacherLogin');
const isTeacher = require('../../middlewares/isTeacher');

const teachersRouter = express.Router();

teachersRouter.post('/admin/register', isLogin, isAdmin, adminRegisterTeacher);
teachersRouter.post('/login', loginTeacher);
teachersRouter.get('/admin/', isLogin, isAdmin, getAllTeachersAdmin);
teachersRouter.get('/profile', isTeacherLogin, isTeacher, getTeacherProfile);
teachersRouter.get('/:teacherID/admin', isLogin, isAdmin, getTeacherByAdmin);
teachersRouter.put(
  '/:teacherID/update',
  isTeacherLogin,
  isTeacher,
  teacherUpdateProfile
);
teachersRouter.put(
  '/:teacherID/update/admin',
  isLogin,
  isAdmin,
  adminUpdateTeacher
);

module.exports = teachersRouter;
