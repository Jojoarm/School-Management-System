const AsyncHandler = require('express-async-handler');
const Admin = require('../../model/Staff/Admin');
const Subject = require('../../model/Academic/Subject');
const YearGroup = require('../../model/Academic/YearGroup');

//@desc create year group
//@route POST /api/v1/year-groups
//@acess Private
exports.createYearGroup = AsyncHandler(async (req, res) => {
  const { name, academicYear } = req.body;

  //check if year group exist
  const yearGroupFound = await YearGroup.findOne({ name });
  if (yearGroupFound) {
    throw new Error('Year Group/Graduation Year already exist');
  }

  //create year group
  const yearGroupCreated = await YearGroup.create({
    name,
    academicYear,
    createdBy: req.userAuth._id,
  });

  //push yearGroup into admin
  const admin = await Admin.findById(req.userAuth._id);
  if (!admin) {
    throw new Error('Admin not found');
  }
  admin.yearGroups.push(yearGroupCreated._id);
  await admin.save();

  res.status(200).json({
    status: 'Success',
    message: 'Year Group created successfully',
    data: yearGroupCreated,
  });
});

//@desc get all year groups
//@route GET /api/v1/year-groups
//@acess Private
exports.getYearGroups = AsyncHandler(async (req, res) => {
  const yearGroups = await YearGroup.find();
  res.status(200).json({
    status: 'Success',
    message: 'Year Groups fetched successfully',
    data: yearGroups,
  });
});

//@desc get single year group
//@route GET /api/v1/year-groups/:id
//@acess Private
exports.getYearGroup = AsyncHandler(async (req, res) => {
  const yearGroup = await YearGroup.findById(req.params.id);
  res.status(200).json({
    status: 'Success',
    message: 'Year Group fetched successfully',
    data: yearGroup,
  });
});

//@desc update year group
//@route PUT /api/v1/year-groups/:id
//@acess Private
exports.updateYearGroup = AsyncHandler(async (req, res) => {
  const { name, academicYear } = req.body;
  //check if name exists
  const yearGroupFound = await YearGroup.findOne({ name });
  if (yearGroupFound) {
    throw new Error('Year group already exist');
  }
  const yearGroup = await YearGroup.findByIdAndUpdate(
    req.params.id,
    { name, academicYear, createdBy: req.userAuth._id },
    { new: true }
  );
  res.status(200).json({
    status: 'Success',
    message: 'Year Group updated successfully',
    data: yearGroup,
  });
});

//@desc delete year group
//@route DELETE /api/v1/year-groups/:id
//@acess Private
exports.deleteYearGroup = AsyncHandler(async (req, res) => {
  await YearGroup.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'Success',
    message: 'Year Group deleted successfully',
  });
});
