const AsyncHandler = require('express-async-handler');
const Teacher = require('../../model/Staff/Teacher');
const Exam = require('../../model/Academic/Exam');

//@desc Create Exam
//@route POST /api/v1/exams
//@acess Private Teachers only
exports.createExam = AsyncHandler(async (req, res) => {
  const {
    name,
    description,
    subject,
    program,
    academicTerm,
    duration,
    classLevel,
    examDate,
    examType,
    examTime,
    createdBy,
    academicYear,
  } = req.body;

  //Find teacher
  const teacherFound = await Teacher.findById(req.userAuth?._id);
  if (!teacherFound) {
    throw new Error('Teacher not found');
  }

  //chech if exam exist
  const examExist = await Exam.findOne({ name });
  if (examExist) {
    throw new Error('Exam already exist');
  }

  //create exam
  const examsCreated = await new Exam({
    name,
    description,
    academicTerm,
    academicYear,
    classLevel,
    createdBy,
    duration,
    examDate,
    examTime,
    examType,
    subject,
    program,
    createdBy: req.userAuth._id,
  });

  //push the exam into teacher
  teacherFound.examsCreated.push(examsCreated._id);

  //save exam
  await examsCreated.save();
  await teacherFound.save();
  res.status(201).json({
    status: 'Success',
    message: 'exam created',
    data: examsCreated,
  });
});

//@desc get all exams
//@route GET /api/v1/exams
//@acess Private
exports.getExams = AsyncHandler(async (req, res) => {
  const exams = await Exam.find();
  res.status(200).json({
    status: 'Success',
    message: 'Exams fetched successfully',
    data: exams,
  });
});

//@desc get single exam
//@route GET /api/v1/exams/:id
//@acess Private
exports.getExam = AsyncHandler(async (req, res) => {
  const exam = await Exam.findById(req.params.id);
  res.status(200).json({
    status: 'Success',
    message: 'Exam fetched successfully',
    data: exam,
  });
});

//@desc update exam
//@route PUT /api/v1/exams/:id
//@acess Private
exports.updateExam = AsyncHandler(async (req, res) => {
  const {
    name,
    description,
    subject,
    program,
    academicTerm,
    duration,
    classLevel,
    examDate,
    examType,
    examTime,
    createdBy,
    academicYear,
  } = req.body;

  //check if exam exists
  const examFound = await Exam.findOne({ name });
  if (examFound) {
    throw new Error('Exam already exist');
  }
  const exam = await Exam.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      academicTerm,
      academicYear,
      classLevel,
      createdBy,
      duration,
      examDate,
      examTime,
      examType,
      subject,
      program,
      createdBy: req.userAuth._id,
    },
    { new: true }
  );
  res.status(200).json({
    status: 'Success',
    message: 'Exam updated successfully',
    data: exam,
  });
});

//@desc delete exam
//@route DELETE /api/v1/exams/:id
//@acess Private
exports.deleteExam = AsyncHandler(async (req, res) => {
  await Exam.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'Success',
    message: 'Exam deleted successfully',
  });
});
