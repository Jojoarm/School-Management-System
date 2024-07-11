const express = require('express');

const adminRouter = express.Router();

//register admin
adminRouter.post('/register', (req, res) => {
  try {
    res.status(201).json({
      status: 'success',
      data: 'Admin has been created',
    });
  } catch (error) {
    console.log('failed');
    res.json({
      status: 'failed',
      error: error.message,
    });
  }
});

//Login
adminRouter.post('/login', (req, res) => {
  try {
    res.status(201).json({
      status: 'success',
      data: 'Admin has been logged in',
    });
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    });
  }
});

//get all admins
adminRouter.get('/', (req, res) => {
  try {
    res.status(201).json({
      status: 'success',
      data: 'All admins',
    });
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    });
  }
});

//get an admin
adminRouter.get('/:id', (req, res) => {
  try {
    res.status(201).json({
      status: 'success',
      data: 'Single Admin',
    });
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    });
  }
});

//update admin
adminRouter.put('/:id', (req, res) => {
  try {
    res.status(201).json({
      status: 'success',
      data: 'Admin Updated',
    });
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    });
  }
});

//delete admin
adminRouter.delete('/:id', (req, res) => {
  try {
    res.status(201).json({
      status: 'success',
      data: 'Admin Deleted',
    });
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    });
  }
});

//suspend teacher
adminRouter.put('/suspend/teacher/:id', (req, res) => {
  try {
    res.status(201).json({
      status: 'success',
      data: 'Teacher Suspended',
    });
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    });
  }
});

//unsuspend teacher
adminRouter.put('/unsuspend/teacher/:id', (req, res) => {
  try {
    res.status(201).json({
      status: 'success',
      data: 'Teacher Unsuspended',
    });
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    });
  }
});

//withdraw teacher
adminRouter.put('/withdraw/teacher/:id', (req, res) => {
  try {
    res.status(201).json({
      status: 'success',
      data: 'Teacher Withdrawn',
    });
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    });
  }
});

//unwithdraw teacher
adminRouter.put('/unwithdraw/teacher/:id', (req, res) => {
  try {
    res.status(201).json({
      status: 'success',
      data: 'Teacher UnWithdrawn',
    });
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    });
  }
});

//publish a result
adminRouter.put('/publish/exam/:id', (req, res) => {
  try {
    res.status(201).json({
      status: 'success',
      data: 'Exam result published',
    });
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    });
  }
});

//unpublish a result
adminRouter.put('/unpublish/exam/:id', (req, res) => {
  try {
    res.status(201).json({
      status: 'success',
      data: 'Exam result unpublished',
    });
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    });
  }
});

module.exports = adminRouter;
