const AsyncHandler = require('express-async-handler');
const ClassLevel = require('../../model/Academic/ClassLevel');
const Admin = require('../../model/Staff/Admin');

//@desc create class Level
//@route POST /api/v1/class-levels
//@acess Private
exports.createClassLevel = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;

  //check if class level exist
  const classLevel = await ClassLevel.findOne({ name });
  if (classLevel) {
    throw new Error('Class level already exist');
  }

  //create class level
  const classLevelCreated = await ClassLevel.create({
    name,
    description,
    createdBy: req.userAuth._id,
  });

  //push class level into admin
  const admin = await Admin.findById(req.userAuth._id);
  admin.classLevels.push(classLevelCreated._id);
  await admin.save();

  res.status(200).json({
    status: 'Success',
    message: 'Class Level created successfully',
    data: classLevelCreated,
  });
});

//@desc get all class levels
//@route GET /api/v1/class-levels
//@acess Private
exports.getClassLevels = AsyncHandler(async (req, res) => {
  const classLevels = await ClassLevel.find();
  res.status(200).json({
    status: 'Success',
    message: 'Class Levels fetched successfully',
    data: classLevels,
  });
});

//@desc get single class level
//@route GET /api/v1/class-levels/:id
//@acess Private
exports.getClassLevel = AsyncHandler(async (req, res) => {
  const classLevel = await ClassLevel.findById(req.params.id);
  res.status(200).json({
    status: 'Success',
    message: 'Class Level fetched successfully',
    data: classLevel,
  });
});

//@desc update class level
//@route PUT /api/v1/class-levels/:id
//@acess Private
exports.updateClassLevel = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;
  //check if name exists
  const createClassLevelFound = await ClassLevel.findOne({ name });
  if (createClassLevelFound) {
    throw new Error('Class Level already exist');
  }
  const classLevel = await ClassLevel.findByIdAndUpdate(
    req.params.id,
    { name, description, createdBy: req.userAuth._id },
    { new: true }
  );
  res.status(200).json({
    status: 'Success',
    message: 'Class Level updated successfully',
    data: classLevel,
  });
});

//@desc delete class level
//@route DELETE /api/v1/class-levels/:id
//@acess Private
exports.deleteClassLevel = AsyncHandler(async (req, res) => {
  await ClassLevel.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'Success',
    message: 'Class Level deleted successfully',
  });
});
