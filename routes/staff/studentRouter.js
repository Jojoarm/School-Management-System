const express = require('express');
const isLogin = require('../../middlewares/isLogin');
const isAdmin = require('../../middlewares/isAdmin');
const {
  adminRegisterStudent,
  loginStudent,
  getStudentProfile,
  getAllStudentsAdmin,
  getStudentByAdmin,
  studentUpdateProfile,
  adminUpdateStudent,
  writeExam,
} = require('../../controller/student/studentCtrl');
const isStudent = require('../../middlewares/isStudent');
const isStudentLogin = require('../../middlewares/isStudentLogin');

const studentsRouter = express.Router();

studentsRouter.post('/admin/register', isLogin, isAdmin, adminRegisterStudent);
studentsRouter.post('/login', loginStudent);
studentsRouter.get('/profile', isStudentLogin, isStudent, getStudentProfile);
studentsRouter.get('/admin', isLogin, isAdmin, getAllStudentsAdmin);
studentsRouter.get('/:studentID/admin', isLogin, isAdmin, getStudentByAdmin);
studentsRouter.put('/update', isStudentLogin, isStudent, studentUpdateProfile);
studentsRouter.put(
  '/:studentID/update/admin',
  isLogin,
  isAdmin,
  adminUpdateStudent
);
studentsRouter.post(
  '/exam/:examID/write',
  isStudentLogin,
  isStudent,
  writeExam
);

module.exports = studentsRouter;
