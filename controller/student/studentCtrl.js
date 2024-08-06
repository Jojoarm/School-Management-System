const AsyncHandler = require('express-async-handler');
const Student = require('../../model/Academic/Student');
const { hashPassword, verifyPassword } = require('../../utils/helpers');
const generateToken = require('../../utils/generateToken');
const Exam = require('../../model/Academic/Exam');
const ExamResult = require('../../model/Academic/ExamResults');
const Admin = require('../../model/Staff/Admin');

//@desc Admin register teacher
//@route POST /api/v1/students/admin/register
//@acess Private Admin only
exports.adminRegisterStudent = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //find the admin
  const adminFound = await Admin.findById(req.userAuth._id);
  if (!adminFound) {
    throw new Erorr('Admin not found');
  }

  //check if student already exist
  const student = await Student.findOne({ email });
  if (student) {
    throw new Error('Student already registered');
  }

  //Hash password
  const hashedPassword = await hashPassword(password);

  //create student
  const studentCreated = await Student.create({
    name,
    email,
    password: hashedPassword,
  });

  //push the student into admin
  adminFound.students.push(studentCreated?.id);
  await adminFound.save();

  //send student data
  res.status(201).json({
    status: 'success',
    message: 'Student registered successfully',
    data: studentCreated,
  });
});

//@desc Login a teacher
//@route POST /api/v1/students/login
//@acess Private
exports.loginStudent = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //Find the student
  const student = await Student.findOne({ email });
  if (!student) {
    return res.json({ message: 'Invalid login credentials' });
  }
  //verify the password
  const isMatched = await verifyPassword(password, student?.password);
  if (!isMatched) {
    return res.json({ message: 'Wrong Password' });
  } else {
    res.status(200).json({
      status: 'Success',
      message: 'Student logged in successfully',
      data: generateToken(student?._id),
    });
  }
});

//@desc Student Profile
//@route Get /api/v1/students/profile
//@acess Private student only
exports.getStudentProfile = AsyncHandler(async (req, res) => {
  const student = await Student.findById(req.userAuth._id)
    .select('-password -createdAt -updatedAt')
    .populate('examResults');
  if (!student) {
    throw new Error('Student not found');
  }
  //get student profile
  const studentProfile = {
    name: student?.name,
    email: student?.email,
    currrentClassLevel: student?.currentClassLevel,
    program: student?.program,
    dateAdmitted: student?.dateAdmitted,
    isSuspended: student?.isSuspended,
    isWithdrawn: student?.isWithdrawn,
    studentId: student?.studentId,
    prefectName: student?.prefectName,
  };
  //get student exam result
  const examResults = student?.examResults;
  const currentExamResult = examResults[examResults.length - 1];
  //check if exam is published
  const isPublished = currentExamResult?.isPublished;

  res.status(200).json({
    status: 'success',
    message: 'Student fetched successfully',
    data: {
      studentProfile,
      currentExamResult: isPublished ? currentExamResult : [],
    },
  });
});

//@desc Get all students
//@route POST /api/v1/students/admin/
//@acess Private admin only
exports.getAllStudentsAdmin = AsyncHandler(async (req, res) => {
  const students = await Student.find();
  res.status(200).json({
    status: 'success',
    message: 'Students fetched successfully',
    data: students,
  });
});

//@desc Get single student
//@route POST /api/v1/students/:studentID/admin
//@acess Private admin only
exports.getStudentByAdmin = AsyncHandler(async (req, res) => {
  const studentID = req.params.studentID;

  //find the student
  const student = await Student.findById(studentID);
  if (!student) {
    throw new Error('Student not found');
  }
  res.status(200).json({
    status: 'success',
    message: 'Student fetched successfully',
    data: student,
  });
});

//@desc  Student updating profile
//@route PUT /api/students/update
//@acess Private student only
exports.studentUpdateProfile = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //if email is taken
  const emailExist = await Student.findOne({ email });
  if (emailExist) {
    throw new Error('This email is taken');
  }

  //if user is updating password
  if (password) {
    //update
    const student = await Student.findByIdAndUpdate(
      req.userAuth,
      {
        email,
        password: await hashPassword(password),
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      data: student,
      message: 'Student updated successfully',
    });
  } else {
    const student = await Student.findByIdAndUpdate(
      req.userAuth,
      {
        email,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      data: student,
      message: 'Student updated successfully',
    });
  }
});

//@desc  Admin updating Student's profile
//@route PUT /api/students/:studentID/update/admin
//@acess Private admin only
exports.adminUpdateStudent = AsyncHandler(async (req, res) => {
  const {
    classLevels,
    academicYear,
    program,
    name,
    email,
    prefectName,
    isSuspended,
    isWithdrawn,
  } = req.body;

  //find the student by id
  const studentFound = await Student.findById(req.params.studentID);
  if (!studentFound) {
    throw new Error('Student not found!');
  }

  //update
  const studentUpdated = await Student.findByIdAndUpdate(
    req.params.studentID,
    {
      $set: {
        name,
        email,
        academicYear,
        program,
        prefectName,
        isSuspended,
        isWithdrawn,
      },
      $addToSet: {
        classLevels,
      },
    },
    {
      new: true,
    }
  );

  //send response
  res.status(200).json({
    status: 'Success',
    data: studentUpdated,
    message: 'Student updated successfully',
  });
});

//@desc  Student taking exam
//@route POST /api/students/exam/:examID/write
//@acess Private student only
exports.writeExam = AsyncHandler(async (req, res) => {
  //get student
  const studentFound = await Student.findById(req.userAuth?._id);
  if (!studentFound) {
    throw new Error('Student not found');
  }
  //get exam
  const examFound = await Exam.findById(req.params.examID)
    .populate('questions')
    .populate('academicTerm');
  if (!examFound) {
    throw new Error('Exam not found');
  }

  // check if student has already taken the exams
  const studentResultFound = await ExamResult.findOne({
    student: studentFound?._id,
  });
  if (studentResultFound) {
    throw new Error('You have already taken this exam');
  }

  //check if student is suspended/withdrawn
  if (studentFound.isWithdrawn || studentFound.isSuspended) {
    throw new Error('You are not allowed to sit for this exam');
  }

  //get questions
  const questions = examFound?.questions;
  // get students answers
  const studentAnswers = req.body.answers;
  //check if student answered all questions
  if (studentAnswers.length !== questions.length) {
    throw new Error('You have not answered all questions');
  }
  //Build report object
  let correctAnswers = 0;
  let wrongAnswers = 0;
  let totalQuestions = questions.length;
  let grade = 0;
  let score = 0;
  let answeredQuestions = [];
  let status = '';
  let remarks = '';

  //check for answers
  for (let i = 0; i < questions.length; i++) {
    //find the question
    const question = questions[i];
    //check if the answer is correct
    if (question.correctAnswer === studentAnswers[i]) {
      correctAnswers++;
      score++;
      question.isCorrect = true;
    } else {
      wrongAnswers++;
    }
  }

  //calculate reports
  grade = (correctAnswers / totalQuestions) * 100;
  answeredQuestions = questions.map((question) => {
    return {
      question: question.question,
      correctAnswer: question.correctAnswer,
      isCorrect: question.isCorrect,
    };
  });

  //status
  if (grade >= 50) {
    status = 'Pass';
  } else {
    status = 'Fail';
  }

  //remarks
  if (grade >= 80) {
    remarks = 'Excellent';
  } else if (grade >= 70) {
    remarks = 'Very Good';
  } else if (grade >= 60) {
    remarks = 'Good';
  } else if (grade >= 50) {
    remarks = 'Fair';
  } else {
    remarks = 'Poor';
  }

  //Generate exam result
  const examResults = await ExamResult.create({
    studentID: studentFound?.studentId,
    exam: examFound?._id,
    grade,
    score,
    status,
    remarks,
    classLevel: examFound?.classLevel,
    academicTerm: examFound?.academicTerm,
    academicYear: examFound?.academicYear,
    answeredQuestions: answeredQuestions,
  });

  // //push results into student
  studentFound.examResults.push(examResults?._id);
  await studentFound.save();

  //promoting student
  if (examFound.academicTerm.name === '3rd Semester' && status === 'Pass') {
    if (studentFound?.currentClassLevel === 'Level 100') {
      studentFound.classLevels.push('Level 200');
      studentFound.currentClassLevel = 'Level 200';
      await studentFound.save();
    } else if (studentFound?.currentClassLevel === 'Level 200') {
      studentFound.classLevels.push('Level 300');
      studentFound.currentClassLevel = 'Level 300';
      await studentFound.save();
    } else if (studentFound?.currentClassLevel === 'Level 300') {
      studentFound.classLevels.push('Level 400');
      studentFound.currentClassLevel = 'Level 400';
      await studentFound.save();
    } else if (studentFound?.currentClassLevel === 'Level 400') {
      studentFound.isGraduated = true;
      studentFound.yearGraduated = new Date();
      await studentFound.save();
    }
  }

  //send
  res.status(200).json({
    status: 'Success',
    data: 'You have submitted your exam. Check later for the result',
  });
});
