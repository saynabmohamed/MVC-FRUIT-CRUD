const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
require('dotenv').config();

// const {
//   createFruit,
//   getFruits,
//   getOneFruit,
//   updateFruit,
//   deleteFruit
// } = require("../controller/fruitcontroler");
const app = express();

// database connection
const {connecttodatabase} = require('./database/connectiontodatabase.js');

// routes
const fruitRoutes = require('./routes/approutes');

// middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// connect DB
 connecttodatabase();

// use routes
app.use('/api', fruitRoutes);

// test route
app.get("/", function (req, res) {
  res.send("welcome to our server");
});

// start server
app.listen(3200, function () {
 
  console.log("my server runs on port 3200");
});