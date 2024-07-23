const AsyncHandler = require('express-async-handler');
const AcademicTerm = require('../../model/Academic/AcademicTerm');
const Admin = require('../../model/Staff/Admin');

//@desc create academic term
//@route POST /api/v1/academic-terms
//@acess Private
exports.createAcademicTerm = AsyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;

  //check if academic term exist
  const academicTerm = await AcademicTerm.findOne({ name });
  if (academicTerm) {
    throw new Error('Academic Term already exist');
  }

  //create academic term
  const academicTermCreated = await AcademicTerm.create({
    name,
    description,
    duration,
    createdBy: req.userAuth._id,
  });

  //push academic year into admin
  const admin = await Admin.findById(req.userAuth._id);
  admin.academicTerms.push(academicTermCreated._id);
  await admin.save();

  res.status(200).json({
    status: 'Success',
    message: 'Academic term created successfully',
    data: academicTermCreated,
  });
});

//@desc get all academic terms
//@route GET /api/v1/academic-terms
//@acess Private
exports.getAcademicTerms = AsyncHandler(async (req, res) => {
  const academicTerms = await AcademicTerm.find();
  res.status(200).json({
    status: 'Success',
    message: 'Academic terms fetched successfully',
    data: academicTerms,
  });
});

//@desc get single academic term
//@route GET /api/v1/academic-terms/:id
//@acess Private
exports.getAcademicTerm = AsyncHandler(async (req, res) => {
  const academicTerm = await AcademicTerm.findById(req.params.id);
  res.status(200).json({
    status: 'Success',
    message: 'Academic term fetched successfully',
    data: academicTerm,
  });
});

//@desc update academic term
//@route PUT /api/v1/academic-terms/:id
//@acess Private
exports.updateAcademicTerm = AsyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;

  //check if name exists
  const createAcademicTermFound = await AcademicTerm.findOne({ name });
  if (createAcademicTermFound) {
    throw new Error('Academic term already exist');
  }
  const academicTerm = await AcademicTerm.findByIdAndUpdate(
    req.params.id,
    { name, description, duration, createdBy: req.userAuth._id },
    { new: true }
  );
  res.status(200).json({
    status: 'Success',
    message: 'Academic term updated successfully',
    data: academicTerm,
  });
});

//@desc delete academic term
//@route DELETE /api/v1/academic-terms/:id
//@acess Private
exports.deleteAcademicTerm = AsyncHandler(async (req, res) => {
  await AcademicTerm.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'Success',
    message: 'Academic term deleted successfully',
  });
});
