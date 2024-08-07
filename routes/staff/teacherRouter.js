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
const advancedResults = require('../../middlewares/advancedResults');
const Teacher = require('../../model/Staff/Teacher');
const Admin = require('../../model/Staff/Admin');
const isAuth = require('../../middlewares/isAuth');
const roleRestriction = require('../../middlewares/roleRestriction');

const teachersRouter = express.Router();

teachersRouter.post(
  '/admin/register',
  isAuth(Admin),
  roleRestriction('admin'),
  adminRegisterTeacher
);
teachersRouter.post('/login', loginTeacher);
teachersRouter.get(
  '/admin/',
  isAuth(Admin),
  roleRestriction('admin'),
  advancedResults(Teacher, {
    path: 'examsCreated classLevel',
    populate: {
      path: 'questions',
    },
  }),
  getAllTeachersAdmin
);
teachersRouter.get(
  '/profile',
  isAuth(Teacher),
  roleRestriction('teacher'),
  getTeacherProfile
);
teachersRouter.get(
  '/:teacherID/admin',
  isAuth(Admin),
  roleRestriction('admin'),
  getTeacherByAdmin
);
teachersRouter.put(
  '/:teacherID/update',
  isAuth(Teacher),
  roleRestriction('teacher'),
  teacherUpdateProfile
);
teachersRouter.put(
  '/:teacherID/update/admin',
  isAuth(Admin),
  roleRestriction('admin'),
  adminUpdateTeacher
);

module.exports = teachersRouter;
