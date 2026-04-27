const express = require("express");
const {createFruit, getAllfruits, getOneFruit, updateFruit, deleteFruit} = require('../controller/fruitcontroler');
const router = express.Router();

// // import controller functions
// const {
//   createFruit,
//   getFruits,
//   getOneFruit,
//   updateFruit,
//   deleteFruit
// } = require("../controller/fruitcontroler"); // hubi spelling-kan

// CREATE (POST)
router.post("/fruits", createFruit);
router.get("/fruits" , getAllfruits);
router.patch("/fruits/:id" , updateFruit);
router.delete("/fruits/:id" , deleteFruit);


// READ ALL (GET)
// router.get("/fruits", getFruits);

// // READ ONE (GET by ID)


// // UPDATE (PUT)
// router.put("/fruits/:id", updateFruit);

// // DELETE
// router.delete("/fruits/:id", deleteFruit);

module.exports = router;