const express = require('express');
const morgan = require('morgan');
const adminRouter = require('../routes/staff/adminRouter');
const {
  globalErrHandler,
  notFoundErr,
} = require('../middlewares/globalErrorHandler');

const app = express();

//Middlewares
app.use(morgan('dev'));

//Parsing incoming data
app.use(express.json());

//Routes

//Admin register
app.use('/api/v1/admins', adminRouter);

//Error middlewares
app.use(notFoundErr);
app.use(globalErrHandler);

module.exports = app;
