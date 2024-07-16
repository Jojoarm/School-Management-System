const AsyncHandler = require('express-async-handler');
const Admin = require('../../model/Staff/Admin');
const generateToken = require('../../utils/generateToken');
const verifyToken = require('../../utils/verifyToken');

//@desc Register Admin
//@route POST /api/admins/register
//@acess Private
exports.registerAdminCtrl = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //Check if email exists
  const adminFound = await Admin.findOne({ email });
  if (adminFound) {
    throw new Error('Admin Exists');
  }

  //register
  const user = await Admin.create({
    name,
    email,
    password,
  });
  res.status(201).json({
    status: 'success',
    data: user,
  });
});

//@desc  Admin Login
//@route POST /api/admins/login
//@acess Private
exports.loginAdminCtrl = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //find user
  const user = await Admin.findOne({ email });
  if (!user) {
    return res.json({ message: 'User not found' });
  }
  if (user && (await user.verifyPassword(password))) {
    const token = generateToken(user._id);
    const verify = verifyToken(token);
    // if (token) {

    //   console.log(verify);
    // }
    return res.json({ data: generateToken(user._id), user, verify });
  } else {
    return res.json({ message: 'Invalid login credentials!' });
  }
});

//@desc  Get admins
//@route GET /api/admins
//@acess Private
exports.getAdminsCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: 'success',
      data: 'All admins',
    });
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    });
  }
};

//@desc  Get admin
//@route GET /api/admins/:id
//@acess Private
exports.getAdminCtrl = (req, res) => {
  try {
    console.log(req.userAuth);
    res.status(201).json({
      status: 'success',
      data: 'Single Admin',
    });
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    });
  }
};

//@desc  Update admin
//@route PUT /api/admins/:id
//@acess Private
exports.updateAdminCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: 'success',
      data: 'Admin Updated',
    });
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    });
  }
};

//@desc  delete admin
//@route DELETE /api/admins/:id
//@acess Private
exports.deleteAdminCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: 'success',
      data: 'Admin Deleted',
    });
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    });
  }
};

//@desc  Suspend teacher
//@route PUT /api/admins/suspend/teacher/:id
//@acess Private
exports.adminSuspendTeacherCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: 'success',
      data: 'Teacher Suspended',
    });
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    });
  }
};

//@desc  Unsuspend teacher
//@route PUT /api/admins/unsuspend/teacher/:id
//@acess Private
exports.adminUnsuspendTeacherCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: 'success',
      data: 'Teacher Unsuspended',
    });
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    });
  }
};

//@desc  Withdraw teacher
//@route PUT /api/admins/withdraw/teacher/:id
//@acess Private
exports.adminWithdrawTeacherCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: 'success',
      data: 'Teacher Withdrawn',
    });
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    });
  }
};

//@desc  Unwithdraw teacher
//@route PUT /api/admins/unwithdraw/teacher/:id
//@acess Private
exports.adminUnwithdrawTeacherCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: 'success',
      data: 'Teacher UnWithdrawn',
    });
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    });
  }
};

//@desc  Publish Result
//@route PUT /api/admins/publish/exam/:id
//@acess Private
exports.adminPublishResultsCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: 'success',
      data: 'Exam result published',
    });
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    });
  }
};

//@desc  Unpublish result
//@route PUT /api/admins/unpublish/exam/:id
//@acess Private
exports.adminUnpublishResultsCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: 'success',
      data: 'Exam result unpublished',
    });
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    });
  }
};
