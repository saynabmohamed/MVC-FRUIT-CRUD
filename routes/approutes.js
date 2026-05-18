const express = require("express");

const {createFruit, getAllfruits, getOneFruit, updateFruit, deleteFruit} = require('../controller/fruitcontroler');
//products


const {createProduct, getAllproducts, getAllProducts, updateProduct, deleteProduct}= require('../controller/productcontroller');

// payment 
const { createPayment, getAllPayments, getPaymentsByStudent, deletePayment } = require("../controller/paymentcontroller");

//student

const{createStudent,getAllStudents, getOneStudent, updateStudent, deleteStudent} =require ("../controller/studentcontroller");
const router = express.Router();

// // import controller functions
// const {
//   createFruit,
//   getFruits,
//   getOneFruit,
//   updateFruit,
//   deleteFruit
// } = require("../controller/fruitcontroler"); // hubi spelling-kan

// fruit 
router.post("/fruits", createFruit);
router.get("/fruits" , getAllfruits);
router.patch("/fruits/:id" , updateFruit);
router.delete("/fruits/:id" , deleteFruit);

// product
router.post("/products", createProduct);
router.get("/products" , getAllProducts);
router.patch("/products/:id" , updateProduct);
router.delete("/products/:id" , deleteProduct);

// student 
router.post("/students", createStudent);
router.get("/students" , getAllStudents);
router.get("/students/:studentId" , getOneStudent);
router.patch("/students/:studentId" , updateStudent);
router.delete("/students/:studentId", deleteStudent);





// payment
router.post("/payments", createPayment);
router.get("/payments" , getAllPayments);
router.get("/payments/student/:studentId" , getPaymentsByStudent);
router.delete("/payments/:paymentId", deletePayment);


// READ ALL (GET)
// router.get("/fruits", getFruits);

// // READ ONE (GET by ID)


// // UPDATE (PUT)
// router.put("/fruits/:id", updateFruit);

// // DELETE
// router.delete("/fruits/:id", deleteFruit);

module.exports = router;