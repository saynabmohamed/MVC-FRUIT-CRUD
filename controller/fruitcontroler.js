const Fruit = require('../models/fruitmodel');

// CREATE
const createFruit = async (req, res) => {
  const { name, rating, review } = req.body;
  try {
    const fruit = new Fruit({
      name,
      rating,
      review

    }

    );

    const result =  await fruit.save();
    // return 
    res.status(201).json({
      success: true,
       message: "Fruit created", 
       data: result
      });

      console.log("result", result);
  } catch (error) {
    console.error(' error creating fruit: ' , error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



const getAllfruits = async (req, res) => {
    try {
        const fruits = await Fruit.find(); //fetch all products from database

        res.status(200).json({
            success: true,
            message: 'fruits fetched successfully',
            data: fruits
        });
    } catch (error) {
        console.error('Error fetching fruits:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateFruit = async (req, res) => {
  try {
    const updated = await Fruit.updateOne(
      { _id: req.params.id },
      req.body
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json(error);
  }
};


// DELETE
const deleteFruit = async (req, res) => {
  try {
    const result = await Fruit.deleteOne({ _id: req.params.id });
    res.json({ message: "Deleted", result });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {createFruit, getAllfruits ,updateFruit , deleteFruit};


// // GET ALL
// const getFruits = async (req, res) => {
//   try {
//     const fruits = await Fruit.find();
//     console.log(fruits);
//     res.json(fruits);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

// // GET ONE
// const getOneFruit = async (req, res) => {
//   try {
//     const fruit = await Fruit.findById(req.params.id);
//     res.json(fruit);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

// // UPDATE ONE

// // UPDATE MANY
// const updateManyFruit = async (req, res) => {
//   try {
//     const result = await Fruit.updateMany(
//       { name: "apple" },
//       { rating: 5 }
//     );
//     res.json(result);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };



// module.exports = {
//   createFruit,
//   getFruits,
//   getOneFruit,
//   updateFruit,
//   updateManyFruit,
//   deleteFruit
// };