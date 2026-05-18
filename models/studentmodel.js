const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({

    studentId: {
        type: String,
        required: true,
        unique: true
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    course: {
        type: String,
        required: true
    },

    yearOfStudy: {
        type: Number,
        required: true
    },

    feesCollected: {
        type: Number,
        default: 0
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model("Student", studentSchema);