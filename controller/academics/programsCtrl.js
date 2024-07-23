const AsyncHandler = require('express-async-handler');
const Admin = require('../../model/Staff/Admin');
const Program = require('../../model/Academic/Program');

//@desc create program
//@route POST /api/v1/programs
//@acess Private
exports.createProgram = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;

  //check if program exist
  const programFound = await Program.findOne({ name });
  if (programFound) {
    throw new Error('Program already exist');
  }

  //create program
  const programCreated = await Program.create({
    name,
    description,

    createdBy: req.userAuth._id,
  });

  //push program into admin
  const admin = await Admin.findById(req.userAuth._id);
  admin.programs.push(programCreated._id);
  await admin.save();

  res.status(200).json({
    status: 'Success',
    message: 'Program created successfully',
    data: programCreated,
  });
});

//@desc get all programs
//@route GET /api/v1/programs
//@acess Private
exports.getPrograms = AsyncHandler(async (req, res) => {
  const programs = await Program.find();
  res.status(200).json({
    status: 'Success',
    message: 'Programs fetched successfully',
    data: programs,
  });
});

//@desc get single program
//@route GET /api/v1/programs/:id
//@acess Private
exports.getProgram = AsyncHandler(async (req, res) => {
  const program = await Program.findById(req.params.id);
  res.status(200).json({
    status: 'Success',
    message: 'Program fetched successfully',
    data: program,
  });
});

//@desc update program
//@route PUT /api/v1/programs/:id
//@acess Private
exports.updateProgram = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;
  //check if name exists
  const programFound = await Program.findOne({ name });
  if (programFound) {
    throw new Error('Program already exist');
  }
  const program = await Program.findByIdAndUpdate(
    req.params.id,
    { name, description, createdBy: req.userAuth._id },
    { new: true }
  );
  res.status(200).json({
    status: 'Success',
    message: 'Program updated successfully',
    data: program,
  });
});

//@desc delete program
//@route DELETE /api/v1/programs/:id
//@acess Private
exports.deleteProgram = AsyncHandler(async (req, res) => {
  await Program.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'Success',
    message: 'Program deleted successfully',
  });
});
