const express = require('express');
const morgan = require('morgan');
const adminRouter = require('../routes/staff/adminRouter');
const {
  globalErrHandler,
  notFoundErr,
} = require('../middlewares/globalErrorHandler');
const academicYearRouter = require('../routes/academics/academicYearRouter');
const academicTermRouter = require('../routes/academics/academicTermRouter');
const classLevelRouter = require('../routes/academics/classLevelRouter');
const programRouter = require('../routes/academics/programRouter');
const subjectRouter = require('../routes/academics/subjectRouter');
const yearGroupRouter = require('../routes/academics/yearGroupRouter');
const teachersRouter = require('../routes/staff/teacherRouter');

const app = express();

//Middlewares
app.use(morgan('dev'));

//Parsing incoming data
app.use(express.json());

//Routes

//Admin register
app.use('/api/v1/admins', adminRouter);
app.use('/api/v1/academic-years', academicYearRouter);
app.use('/api/v1/academic-terms', academicTermRouter);
app.use('/api/v1/class-levels', classLevelRouter);
app.use('/api/v1/programs', programRouter);
app.use('/api/v1/subjects', subjectRouter);
app.use('/api/v1/year-groups', yearGroupRouter);
app.use('/api/v1/teachers', teachersRouter);

//Error middlewares
app.use(notFoundErr);
app.use(globalErrHandler);

module.exports = app;
