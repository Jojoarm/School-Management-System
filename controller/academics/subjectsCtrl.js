const AsyncHandler = require('express-async-handler');
const Admin = require('../../model/Staff/Admin');
const Subject = require('../../model/Academic/Subject');
const Program = require('../../model/Academic/Program');

//@desc create subject
//@route POST /api/v1/subjects/:programID
//@acess Private
exports.createSubject = AsyncHandler(async (req, res) => {
  const { name, description, academicTerm } = req.body;

  //find the program
  const programFound = await Program.findById(req.params.programID);
  if (!programFound) {
    throw new Error('Program not found');
  }

  //check if subject exist
  const subjectFound = await Subject.findOne({ name });
  if (subjectFound) {
    throw new Error('Subject already exist');
  }

  //create subject
  const subjectCreated = await Subject.create({
    name,
    description,
    academicTerm,
    createdBy: req.userAuth._id,
  });

  //push subject into programs
  programFound.subjets.push(subjectCreated._id);
  await programFound.save();

  res.status(200).json({
    status: 'Success',
    message: 'Subject created successfully',
    data: subjectCreated,
  });
});

//@desc get all subjects
//@route GET /api/v1/subjects
//@acess Private
exports.getSubjects = AsyncHandler(async (req, res) => {
  const subjects = await Subject.find();
  res.status(200).json({
    status: 'Success',
    message: 'Subjects fetched successfully',
    data: subjects,
  });
});

//@desc get single subject
//@route GET /api/v1/subjects/:id
//@acess Private
exports.getSubject = AsyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  res.status(200).json({
    status: 'Success',
    message: 'Subject fetched successfully',
    data: subject,
  });
});

//@desc update subject
//@route PUT /api/v1/subjects/:id
//@acess Private
exports.updateSubject = AsyncHandler(async (req, res) => {
  const { name, description, academicTerm } = req.body;
  //check if name exists
  const subjectFound = await Subject.findOne({ name });
  if (subjectFound) {
    throw new Error('Subject already exist');
  }
  const subject = await Subject.findByIdAndUpdate(
    req.params.id,
    { name, description, academicTerm, createdBy: req.userAuth._id },
    { new: true }
  );
  res.status(200).json({
    status: 'Success',
    message: 'Subject updated successfully',
    data: subject,
  });
});

//@desc delete program
//@route DELETE /api/v1/subjects/:id
//@acess Private
exports.deleteSubject = AsyncHandler(async (req, res) => {
  await Subject.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'Success',
    message: 'Subject deleted successfully',
  });
});
