const Payment = require('../models/paymentmodel')
const Student = require('../models/studentmodel')

const createPayment = async (req, res) => {

    const {
        paymentId,
        studentId,
        amount,
        paymentMethod
    } = req.body;

    try {

        // find student using custom studentId

        const student = await Student.findOne({ studentId });

        if (!student) {

            return res.status(404).json({

                success: false,

                message: "Student not found"
            });
        }

        // prevent negative amount

        if (amount <= 0) {

            return res.status(400).json({

                success: false,

                message: "Invalid payment amount"
            });
        }

        // create payment

        const payment = new Payment({

            paymentId,

            studentId: student.studentId,

            studentName: `${student.firstName} ${student.lastName}`,

            amount,

            paymentMethod
        });

        // save payment

        const result = await payment.save();

        // update feesCollected

        student.feesCollected += amount;

        await student.save();

        res.status(201).json({

            success: true,

            message: "Payment created successfully",

            data: result
        });

    } catch (error) {

        console.error("Error creating payment:", error);

        res.status(500).json({

            success: false,

            message: error.message
        });
    }
};
// get all
const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find(); // fetch all payments

        res.status(200).json({
            success: true,
            message: 'Payments fetched successfully',
            data: payments
        });

    } catch (error) {
        console.error('Error fetching payments:', error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
//get one


const getPaymentsByStudent = async (req, res) => {

    const { studentId } = req.params;

    try {

        // find all payments for specific student

        const payments = await Payment.find({ studentId });

        // haddii payment la waayo

        if (payments.length === 0) {

            return res.status(404).json({

                success: false,

                message: "No payments found for this student"
            });
        }

        // success response

        res.status(200).json({

            success: true,

            message: "Student payments fetched successfully",

            totalPayments: payments.length,

            data: payments
        });

        console.log("payments", payments);

    } catch (error) {

        console.error("Error fetching payments:", error);

        res.status(500).json({

            success: false,

            message: error.message
        });
    }
};
// delete payment


const deletePayment = async (req, res) => {

    const { paymentId } = req.params;

    try {

        // find payment first

        const payment = await Payment.findOne({ paymentId });

        // haddii payment la waayo

        if (!payment) {

            return res.status(404).json({

                success: false,

                message: "Payment not found"
            });
        }

        // find related student

        const student = await Student.findOne({

            studentId: payment.studentId
        });

        // haddii student jiro
        // lacagta ka jar feesCollected

        if (student) {

            student.feesCollected -= payment.amount;

            // prevent negative value

            if (student.feesCollected < 0) {

                student.feesCollected = 0;
            }

            await student.save();
        }

        // delete payment

        await Payment.findOneAndDelete({ paymentId });

        // success response

        res.status(200).json({

            success: true,

            message: "Payment deleted successfully"
        });

        console.log("deleted payment", payment);

    } catch (error) {

        console.error("Error deleting payment:", error);

        res.status(500).json({

            success: false,

            message: error.message
        });
    }
};




module.exports = {createPayment , getAllPayments ,getPaymentsByStudent , deletePayment};