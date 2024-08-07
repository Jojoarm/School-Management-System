const AsyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const Admin = require('../../model/Staff/Admin');
const generateToken = require('../../utils/generateToken');
const verifyToken = require('../../utils/verifyToken');
const { hashPassword, verifyPassword } = require('../../utils/helpers');

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
    password: await hashPassword(password),
  });
  res.status(201).json({
    status: 'success',
    data: user,
    message: 'Admin registered successfully',
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

  //verify password
  const isMatched = await verifyPassword(password, user.password);

  if (!isMatched) {
    return res.json({ message: 'Invalid login credentials!' });
  } else {
    return res.json({
      data: generateToken(user._id),
      message: 'Admin logged in successfully',
    });
  }
});

//@desc  Get all admins
//@route GET /api/admins
//@acess Private
exports.getAdminsCtrl = AsyncHandler(async (req, res) => {
  res.status(200).json(res.results);
});

//@desc  Get admin
//@route GET /api/admins/:id
//@acess Private
exports.getAdminProfileCtrl = AsyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.userAuth._id)
    .select('-password -createdAt -updatedAt')
    .populate('academicYears')
    .populate('academicTerms')
    .populate('programs')
    .populate('yearGroups')
    .populate('classLevels')
    .populate('students')
    .populate('teachers');
  if (!admin) {
    throw new Error('Admin not found');
  } else {
    res.status(200).json({
      status: 'Sucess',
      data: admin,
      message: 'Admin profile fetched',
    });
  }
});

//@desc  Update admin
//@route PUT /api/admins/:id
//@acess Private
exports.updateAdminCtrl = AsyncHandler(async (req, res) => {
  const { email, name, password } = req.body;
  //if email is taken
  const emailExist = await Admin.findOne({ email });
  if (emailExist) {
    throw new Error('This email is taken');
  }

  //if user is updating password
  if (password) {
    //update
    const admin = await Admin.findByIdAndUpdate(
      req.userAuth,
      {
        email,
        password: await hashPassword(password),
        name,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      data: admin,
      message: 'Admin updated successfully',
    });
  } else {
    const admin = await Admin.findByIdAndUpdate(
      req.userAuth,
      {
        email,
        name,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      data: admin,
      message: 'Admin updated successfully',
    });
  }
});

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
