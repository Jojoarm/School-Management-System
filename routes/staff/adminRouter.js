const express = require('express');
const {
  registerAdminCtrl,
  loginAdminCtrl,
  getAdminsCtrl,
  getAdminCtrl,
  updateAdminCtrl,
  deleteAdminCtrl,
  adminSuspendTeacherCtrl,
  adminUnsuspendTeacherCtrl,
  adminWithdrawTeacherCtrl,
  adminUnwithdrawTeacherCtrl,
  adminPublishResultsCtrl,
  adminUnpublishResultsCtrl,
} = require('../../controller/staff/adminController');

const adminRouter = express.Router();

//register admin
adminRouter.post('/register', registerAdminCtrl);

//Login
adminRouter.post('/login', loginAdminCtrl);

//get all admins
adminRouter.get('/', getAdminsCtrl);

//get an admin
adminRouter.get('/:id', getAdminCtrl);

//update admin
adminRouter.put('/:id', updateAdminCtrl);

//delete admin
adminRouter.delete('/:id', deleteAdminCtrl);

//suspend teacher
adminRouter.put('/suspend/teacher/:id', adminSuspendTeacherCtrl);

//unsuspend teacher
adminRouter.put('/unsuspend/teacher/:id', adminUnsuspendTeacherCtrl);

//withdraw teacher
adminRouter.put('/withdraw/teacher/:id', adminWithdrawTeacherCtrl);

//unwithdraw teacher
adminRouter.put('/unwithdraw/teacher/:id', adminUnwithdrawTeacherCtrl);

//publish a result
adminRouter.put('/publish/exam/:id', adminPublishResultsCtrl);

//unpublish a result
adminRouter.put('/unpublish/exam/:id', adminUnpublishResultsCtrl);

module.exports = adminRouter;
