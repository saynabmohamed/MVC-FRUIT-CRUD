<<<<<<< HEAD
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
require('dotenv').config();


const app = express();

// database connection
const {connecttodatabase} = require('./database/connectiontodatabase.js');

// routes
const fruitRoutes = require('./routes/approutes');
// product
const productRoutes = require('./routes/approutes.js')
// students 
const studentRoutes = require('./routes/approutes.js')
// payments
const paymentRoutes = require('./routes/approutes.js')


// middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// connect DB
 connecttodatabase();

// use routes
app.use('/api', fruitRoutes);
// product 
app.use('/api', productRoutes);
// students
app.use('/api', studentRoutes);
// payment
app.use('/api', paymentRoutes);



// test route
app.get("/", function (req, res) {
  res.send("welcome to our server");
});

// start server
app.listen(3200, function () {
 
  console.log("my server runs on port 3200");
=======
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
require('dotenv').config();


const app = express();

// database connection
const {connecttodatabase} = require('./database/connectiontodatabase.js');

// routes
const fruitRoutes = require('./routes/approutes');
// product
const productRoutes = require('./routes/approutes.js')
// students 
const studentRoutes = require('./routes/approutes.js')
// payments
const paymentRoutes = require('./routes/approutes.js')


// middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// connect DB
 connecttodatabase();

// use routes
app.use('/api', fruitRoutes);
// product 
app.use('/api', productRoutes);
// students
app.use('/api', studentRoutes);
// payment
app.use('/api', paymentRoutes);



// test route
app.get("/", function (req, res) {
  res.send("welcome to our server");
});

// start server
app.listen(3200, function () {
 
  console.log("my server runs on port 3200");
>>>>>>> 6ff1bccc812351a01fddc027040059be5be873b1
});