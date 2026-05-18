const Student = require('../models/studentmodel')
const Payment = require('../models/paymentmodel')


const createStudent = async (req, res) => {

    const {
        studentId,
        firstName,
        lastName,
        email,
        course,
        yearOfStudy
    } = req.body;

    try {

        const student = new Student({

            studentId,
            firstName,
            lastName,
            email,
            course,
            yearOfStudy

        });

        const result = await student.save();

        res.status(201).json({

            success: true,

            message: "Student created",

            data: result

        });

        console.log("result", result);

    } catch (error) {

        console.error("Error creating student:", error);

        res.status(500).json({

            success: false,

            message: error.message

        });
    }
};


//get all
const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find(); // fetch all students

        res.status(200).json({
            success: true,
            message: 'Students fetched successfully',
            data: students
        });

    } catch (error) {
        console.error('Error fetching students:', error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// get one 

const getOneStudent = async (req, res) => {

    const { studentId } = req.params;

    try {

        const student = await Student.findOne({ studentId });

        // haddii student la waayo

        if (!student) {

            return res.status(404).json({

                success: false,

                message: "Student not found"
            });
        }

        // success response

        res.status(200).json({

            success: true,

            message: "Student fetched successfully",

            data: student
        });

        console.log("student", student);

    } catch (error) {

        console.error("Error fetching student:", error);

        res.status(500).json({

            success: false,

            message: error.message
        });
    }
};
//update


const updateStudent = async (req, res) => {

    const { studentId } = req.params;

    const {
        firstName,
        lastName,
        email,
        course,
        yearOfStudy,
        feesCollected
    } = req.body;

    try {

        // prevent direct update of feesCollected

        if (feesCollected !== undefined) {

            return res.status(400).json({

                success: false,

                message: "feesCollected cannot be updated directly"
            });
        }

        // find and update student

        const student = await Student.findOneAndUpdate(

            { studentId },

            {
                firstName,
                lastName,
                email,
                course,
                yearOfStudy
            },

            {
                new: true,
                runValidators: true
            }
        );

        // haddii student la waayo

        if (!student) {

            return res.status(404).json({

                success: false,

                message: "Student not found"
            });
        }

        // success response

        res.status(200).json({

            success: true,

            message: "Student updated successfully",

            data: student
        });

        console.log("updated student", student);

    } catch (error) {

        console.error("Error updating student:", error);

        res.status(500).json({

            success: false,

            message: error.message
        });
    }
};

// delete 

const deleteStudent = async (req, res) => {

    const { studentId } = req.params;

    try {

        // find student

        const student = await Student.findOne({ studentId });

        // haddii student la waayo

        if (!student) {

            return res.status(404).json({

                success: false,

                message: "Student not found"
            });
        }

        // delete all payments related to student

        await Payment.deleteMany({ studentId });

        // delete student

        await Student.findOneAndDelete({ studentId });

        // success response

        res.status(200).json({

            success: true,

            message: "Student and related payments deleted successfully"
        });

        console.log("deleted student", student);

    } catch (error) {

        console.error("Error deleting student:", error);

        res.status(500).json({

            success: false,

            message: error.message
        });
    }
};


module.exports = {createStudent , getAllStudents , getOneStudent ,updateStudent , deleteStudent}