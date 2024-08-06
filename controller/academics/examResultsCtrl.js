const AsyncHandler = require('express-async-handler');
const ExamResult = require('../../model/Academic/ExamResults');
const Student = require('../../model/Academic/Student');

//@desc Exam result checker
//@route POST /api/v1/exam-results/:id/checking
//@acess Private Student only
exports.checkExamResult = AsyncHandler(async (req, res) => {
  //find the student
  const studentFound = await Student.findById(req.userAuth?._id);
  if (!studentFound) {
    throw new Error('No Student Found');
  }
  //find the exam result
  const examResult = await ExamResult.findOne({
    studentID: studentFound?.studentId,
    _id: req.params.id,
  })
    .populate({
      path: 'exam',
      populate: {
        path: 'questions',
      },
    })
    .populate('classLevel')
    .populate('academicTerm')
    .populate('academicYear');
  //check if exam is published
  if (examResult?.isPublished === false) {
    throw new Error('Exam not yet published');
  }
  res.json({
    status: 'Success',
    message: 'Exam result',
    data: examResult,
    student: studentFound,
  });
});

//@desc Get all examamination results
//@route Get /api/v1/exam-results
//@acess Private Student only
exports.getAllExamResults = AsyncHandler(async (req, res) => {
  const results = await ExamResult.find().select('exam').populate('exam');
  res.status(200).json({
    status: 'Success',
    message: 'Exam Results fetched',
    data: results,
  });
});

//@desc Admin toggle exam results
//@route Put /api/v1/exam-results/:id/admin-toggle-publish
//@acess Private Admin only
exports.adminToggleExamResult = AsyncHandler(async (req, res) => {
  //find the exam result
  const examResult = await ExamResult.findById(req.params.id);
  if (!examResult) {
    throw new Error('Exam result not found');
  }
  const publishResult = await ExamResult.findByIdAndUpdate(
    req.params.id,
    { isPublished: req.body.publish },
    { new: true }
  );
  res.status(200).json({
    status: 'Success',
    message: 'Exam Results updated',
    data: publishResult,
  });
});
