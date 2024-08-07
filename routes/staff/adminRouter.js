const express = require('express');
const {
  registerAdminCtrl,
  loginAdminCtrl,
  getAdminsCtrl,
  getAdminProfileCtrl,
  updateAdminCtrl,
  deleteAdminCtrl,
  adminSuspendTeacherCtrl,
  adminUnsuspendTeacherCtrl,
  adminWithdrawTeacherCtrl,
  adminUnwithdrawTeacherCtrl,
  adminPublishResultsCtrl,
  adminUnpublishResultsCtrl,
} = require('../../controller/staff/adminController');
const isAdmin = require('../../middlewares/isAdmin');
const advancedResults = require('../../middlewares/advancedResults');
const Admin = require('../../model/Staff/Admin');
const isAuth = require('../../middlewares/isAuth');
const roleRestriction = require('../../middlewares/roleRestriction');

const adminRouter = express.Router();

//register admin
adminRouter.post('/register', registerAdminCtrl);

//Login
adminRouter.post('/login', loginAdminCtrl);

//get all admins
adminRouter.get(
  '/',
  isAuth(Admin),
  roleRestriction('admin'),
  advancedResults(Admin),
  getAdminsCtrl
);

//get an admin
adminRouter.get(
  '/profile',
  isAuth(Admin),
  roleRestriction('admin'),
  getAdminProfileCtrl
);

//update admin
adminRouter.put('/', isAuth(Admin), roleRestriction('admin'), updateAdminCtrl);

//delete admin
adminRouter.delete('/:id', deleteAdminCtrl);

//suspend teacher
adminRouter.put(
  '/suspend/teacher/:id',
  isAuth(Admin),
  roleRestriction('admin'),
  adminSuspendTeacherCtrl
);

//unsuspend teacher
adminRouter.put(
  '/unsuspend/teacher/:id',
  isAuth(Admin),
  roleRestriction('admin'),
  adminUnsuspendTeacherCtrl
);

//withdraw teacher
adminRouter.put(
  '/withdraw/teacher/:id',
  isAuth(Admin),
  roleRestriction('admin'),
  adminWithdrawTeacherCtrl
);

//unwithdraw teacher
adminRouter.put(
  '/unwithdraw/teacher/:id',
  isAuth(Admin),
  roleRestriction('admin'),
  adminUnwithdrawTeacherCtrl
);

//publish a result
adminRouter.put(
  '/publish/exam/:id',
  isAuth(Admin),
  roleRestriction('admin'),
  adminPublishResultsCtrl
);

//unpublish a result
adminRouter.put(
  '/unpublish/exam/:id',
  isAuth(Admin),
  roleRestriction('admin'),
  adminUnpublishResultsCtrl
);

module.exports = adminRouter;
