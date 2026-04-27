
 const mongoose = require("mongoose")
 const dns = require("node:dns/promises")
 const {log}= require('node:console')
 dns.setServers(["1.1.1.1"])
function connecttodatabase (){
  try{
   
    mongoose.connect(process.env.DB_URL);
  
  } catch(error){
    console.error('error connecting to mongodb:',error);
  }
  
};
module.exports = {connecttodatabase};