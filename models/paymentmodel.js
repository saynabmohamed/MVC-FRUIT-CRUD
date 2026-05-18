const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({

    paymentId: {
        type: String,
        required: true,
        unique: true
    },

    studentId: {
        type: String,
        required: true
    },

    studentName: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true,
        min: [1, "Amount must be greater than zero"]
    },

    paymentMethod: {

        type: String,

        enum: {

            values: ["Cash", "Bank", "Mobile Money"],

            message: "{VALUE} is not supported"
        }
    },

    dateOfPayment: {
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model("Payment", paymentSchema);