 const mongoose = require("mongoose")
 const fruitschema = mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"please provide a name "]
        },
        rating:{
            type: Number,
            min: 1,
            max: 10,
            required:[true,"please provide a rating"]
        },
        review: String

    }
 );

module.exports = mongoose.model("Fruit" , fruitschema);