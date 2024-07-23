const mongoose = require('mongoose');

const { Schema } = mongoose;

const classLevelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
    //students will be added to the class level when they register
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Student',
      },
    ],
    //optional
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
      },
    ],
    teachers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
      },
    ],
  },
  { timestamps: true }
);

const ClassLevel = mongoose.model('ClassLevel', classLevelSchema);

module.exports = ClassLevel;
