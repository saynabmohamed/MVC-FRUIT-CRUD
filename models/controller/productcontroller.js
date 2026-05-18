const Product = require('../models/productmodel');

// CREATE
const createProduct = async(req, res) => {
    const { name, price, featured, company } = req.body;

    try {
        const product = new Product({
            name,
            price,
            featured,
            company
        });

        const result = await product.save(); //save the product to the database

        //return a success response
        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: result
        });

        console.log("result", result);

    } catch (error) {
        console.error('Error creating product:', error);
        
        //return an error response
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const getAllProducts = async (req, res) => {
    const { name, price, featured, company } = req.query; //get query parameters from the request
    const query = {};

    if (name) {
        query.name = { $regex: name, $options: 'i' }; //use regex for case-insensitive search
    }
    else if (price) {
        query.price = { $lte: price }; //filter products with price less than or equal to the specified price
    }
    else if (featured) {
        query.featured = featured === 'true'; //convert string to boolean
    }
    else if (company) {
        query.company = { $regex: company, $options: 'i' }; //filter products by company
    }
    

    try {
        const products = await Product.find(query); //fetch products from the database based on the query parameters

        console.log("products", products);
        res.status(200).json({
            success: true,
            message: 'Products fetched successfully',
            data: products
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, featured, company } = req.body;

    try {
        const product = await Product.findOneAndUpdate(
            { _id: id },
            { name, price, featured, company },
            { new: true, runValidators: true } // Talo: Ku dar kuwan si aad u hesho xogta cusub
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: product
        });

    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findOneAndDelete({ _id: id }); //delete the product from the database

        //if the product is not found, return a 404 error
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        //return a success response
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        //log the error and return an error response
        console.error('Error deleting product:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
module.exports = {createProduct,getAllProducts,updateProduct, deleteProduct};


