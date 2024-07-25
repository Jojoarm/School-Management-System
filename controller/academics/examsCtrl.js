const AsyncHandler = require('express-async-handler');

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
    examDate,
    examType,
    examTime,
    createdBy,
    academicYear,
  } = req.body;
});
