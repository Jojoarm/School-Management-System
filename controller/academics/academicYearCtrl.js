const AsyncHandler = require('express-async-handler');
const AcademicYear = require('../../model/Academic/AcademicYear');
const Admin = require('../../model/Staff/Admin');

//@desc create academic year
//@route POST /api/v1/academic-years
//@acess Private
exports.createAcademicYear = AsyncHandler(async (req, res) => {
  const { name, fromYear, toYear } = req.body;
  //check if academic year exist

  const academicYear = await AcademicYear.findOne({ name });
  if (academicYear) {
    throw new Error('Academic year already exist');
  }

  //create academic year
  const academicYearCreated = await AcademicYear.create({
    name,
    fromYear,
    toYear,
    createdBy: req.userAuth._id,
  });

  //push academic year into admin
  const admin = await Admin.findById(req.userAuth._id);
  admin.academicYears.push(academicYearCreated._id);
  await admin.save();

  res.status(200).json({
    status: 'Success',
    message: 'Academic year created successfully',
    data: academicYearCreated,
  });
});

//@desc get all academic years
//@route GET /api/v1/academic-years
//@acess Private
exports.getAcademicYears = AsyncHandler(async (req, res) => {
  const academicYears = await AcademicYear.find();
  res.status(200).json({
    status: 'Success',
    message: 'Academic year fetched successfully',
    data: academicYears,
  });
});

//@desc get single academic year
//@route GET /api/v1/academic-years/:id
//@acess Private
exports.getAcademicYear = AsyncHandler(async (req, res) => {
  const academicYear = await AcademicYear.findById(req.params.id);
  res.status(200).json({
    status: 'Success',
    message: 'Academic year fetched successfully',
    data: academicYear,
  });
});

//@desc update academic year
//@route PUT /api/v1/academic-years/:id
//@acess Private
exports.updateAcademicYear = AsyncHandler(async (req, res) => {
  const { name, fromYear, toYear } = req.body;
  //check if name exists
  const createAcademicYearFound = await AcademicYear.findOne({ name });
  if (createAcademicYearFound) {
    throw new Error('Academic year already exist');
  }
  const academicYear = await AcademicYear.findByIdAndUpdate(
    req.params.id,
    { name, fromYear, toYear, createdBy: req.userAuth._id },
    { new: true }
  );
  res.status(200).json({
    status: 'Success',
    message: 'Academic year updated successfully',
    data: academicYear,
  });
});

//@desc delete academic year
//@route DELETE /api/v1/academic-years/:id
//@acess Private
exports.deleteAcademicYear = AsyncHandler(async (req, res) => {
  await AcademicYear.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'Success',
    message: 'Academic year deleted successfully',
  });
});
