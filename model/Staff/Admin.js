const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'admin',
    },
    academicTerms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AcademicTerm',
      },
    ],
    academicYears: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AcademicYear',
      },
    ],
    classLevels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClassLevel',
      },
    ],
    teachers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
      },
    ],
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// //Hash password
// adminSchema.pre('save', async function (next) {
//   //if the user is not updating his password then we prevent re-hashing the password
//   if (!this.isModified('password')) {
//     next();
//   }
//   //salt
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// //Verify Password
// adminSchema.methods.verifyPassword = async function (enteredPassword) {
//   return ;
// };

//model
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
