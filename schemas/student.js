

// const mongoose = require("mongoose");

// const studentSchema = new mongoose.Schema({
//   studentId: { type: String, required: true, unique: true },
//   password: { type: String, required: true },

//   name: String,
//   email: String,
//   mobile: String,
//   address: String,
//   parentMobile: String,


//   course: {
//     name: String, 
//     status: {
//       type: String,
//       enum: ["Ongoing", "Completed"],
//       default: "Ongoing"
//     }
//   },

//   grade: {
//     type: String 
//   },

//   fees: {
//     total: Number,
//     paid: Number,
//     dueDate: Date,
//     emi: Boolean,
//     paymentHistory: [
//       {
//         amount: Number,
//         date: Date,
//         mode: String
//       }
//     ]
//   },

//   attendance: [
//     {
//       date: Date,
//       status: String
//     }
//   ]
// });

// const Student = mongoose.model("student", studentSchema);

// module.exports = Student;

const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    // =========================
    // LOGIN / BASIC DETAILS
    // =========================
    studentId: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
    },

    mobile: {
      type: String,
      trim: true,
    },

    parentMobile: {
      type: String,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },

    // =========================
    // ADMIT CARD DETAILS
    // =========================
    fatherName: {
      type: String,
      trim: true,
      default: "",
    },

    motherName: {
      type: String,
      trim: true,
      default: "",
    },

    dob: {
      type: Date,
      default: null,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Other",
    },

    // Actual uploaded photo URL
    photo: {
      type: String,
      default: "",
    },

    // =========================
    // COURSE DETAILS
    // =========================
    course: {
      name: {
        type: String,
      },

      status: {
        type: String,
        enum: ["Ongoing", "Completed"],
        default: "Ongoing",
      },
    },

    grade: {
      type: String,
    },

    // =========================
    // FEES
    // =========================
    fees: {
      total: {
        type: Number,
        default: 0,
      },

      paid: {
        type: Number,
        default: 0,
      },

      dueDate: {
        type: Date,
      },

      emi: {
        type: Boolean,
        default: false,
      },

      paymentHistory: [
        {
          amount: Number,
          date: Date,
          mode: String,
        },
      ],
    },

    // =========================
    // ATTENDANCE
    // =========================
    attendance: [
      {
        date: Date,
        status: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("student", studentSchema);

module.exports = Student;