const AsyncHandler = require('express-async-handler');
const Teacher = require('../../model/Staff/Teacher');
const { hashPassword, verifyPassword } = require('../../utils/helpers');
const generateToken = require('../../utils/generateToken');

//@desc Admin register teacher
//@route POST /api/v1/teachers/admin/register
//@acess Private
exports.adminRegisterTeacher = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //check if teacher already exist
  const teacher = await Teacher.findOne({ email });
  if (teacher) {
    throw new Error('Teacher already employed');
  }

  //Hash password
  const hashedPassword = await hashPassword(password);

  //create teacher
  const teacherCreated = await Teacher.create({
    name,
    email,
    password: hashedPassword,
  });

  //send teacher data
  res.status(201).json({
    status: 'success',
    message: 'Teacher registered successfully',
    data: teacherCreated,
  });
});

//@desc Login a teacher
//@route POST /api/v1/teachers/login
//@acess Private
exports.loginTeacher = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //Find the teacher
  const teacher = await Teacher.findOne({ email });
  if (!teacher) {
    return res.json({ message: 'Invalid login credentials' });
  }
  //verify the password
  const isMatched = await verifyPassword(password, teacher?.password);
  if (!isMatched) {
    return res.json({ message: 'Invalid login credentials' });
  } else {
    res.status(200).json({
      status: 'Success',
      message: 'Teacher logged in successfully',
      data: generateToken(teacher?._id),
    });
  }
});

//@desc Get all teachers
//@route POST /api/v1/teachers/admin/
//@acess Private admin only
exports.getAllTeachersAdmin = AsyncHandler(async (req, res) => {
  const teachers = await Teacher.find();
  res.status(200).json({
    status: 'success',
    message: 'Teachers fetched successfully',
    data: teachers,
  });
});

//@desc Get single teacher
//@route POST /api/v1/teachers/:teacherID/admin
//@acess Private admin only
exports.getTeacherByAdmin = AsyncHandler(async (req, res) => {
  const teacherID = req.params.teacherID;

  //find the teacher
  const teacher = await Teacher.findById(teacherID);
  if (!teacher) {
    throw new Error('Teacher not found');
  }
  res.status(200).json({
    status: 'success',
    message: 'Teacher fetched successfully',
    data: teacher,
  });
});

//@desc Teacher Profile
//@route POST /api/v1/teachers/profile
//@acess Private teacher only
exports.getTeacherProfile = AsyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.userAuth._id).select(
    '-password -createdAt -updatedAt'
  );
  if (!teacher) {
    throw new Error('Teacher not found');
  }
  res.status(200).json({
    status: 'success',
    message: 'Teacher fetched successfully',
    data: teacher,
  });
});

//@desc  Teacher updating profile
//@route PUT /api/teachers/:teacherID/update
//@acess Private teacher only
exports.teacherUpdateProfile = AsyncHandler(async (req, res) => {
  const { email, name, password } = req.body;
  //if email is taken
  const emailExist = await Teacher.findOne({ email });
  if (emailExist) {
    throw new Error('This email is taken');
  }

  //if user is updating password
  if (password) {
    //update
    const teacher = await Teacher.findByIdAndUpdate(
      req.userAuth,
      {
        email,
        password: await hashPassword(password),
        name,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      data: teacher,
      message: 'Teacher updated successfully',
    });
  } else {
    const teacher = await Teacher.findByIdAndUpdate(
      req.userAuth,
      {
        email,
        name,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      data: teacher,
      message: 'Teacher updated successfully',
    });
  }
});

//@desc  Admin updating Teacher's profile
//@route PUT /api/teachers/:teacherID/update/admin
//@acess Private admin only
exports.adminUpdateTeacher = AsyncHandler(async (req, res) => {
  const { program, classLevel, academicYear, subject } = req.body;
  //find teacher
  const teacherFound = await Teacher.findById(req.params.teacherID);
  if (!teacherFound) {
    throw new Error('Teacher not found');
  }

  //check if teacher is withdrawn
  if (teacherFound.isWithdrawn) {
    throw new Error('Action Denied. Teacher is withdrawn');
  }

  //assign a program to teacher
  if (program) {
    teacherFound.program = program;
    await teacherFound.save();
    res.status(200).json({
      status: 'success',
      data: teacherFound,
      message: 'Teacher updated successfully',
    });
  }

  //assign class level to teacher
  if (classLevel) {
    teacherFound.classLevel = classLevel;
    await teacherFound.save();
    res.status(200).json({
      status: 'success',
      data: teacherFound,
      message: 'Teacher updated successfully',
    });
  }

  //assign academic year to teacher
  if (academicYear) {
    teacherFound.academicYear = academicYear;
    await teacherFound.save();
    res.status(200).json({
      status: 'success',
      data: teacherFound,
      message: 'Teacher updated successfully',
    });
  }

  //assign subject to teacher
  if (subject) {
    teacherFound.subject = subject;
    await teacherFound.save();
    res.status(200).json({
      status: 'success',
      data: teacherFound,
      message: 'Teacher updated successfully',
    });
  }
});
