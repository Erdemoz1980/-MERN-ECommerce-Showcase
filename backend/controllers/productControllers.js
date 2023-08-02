const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel')

//@desc Fetches all products
//@route GET api/products
//@access Public
const getProducts = asyncHandler(async (req, res, next) => {
  try {
    const products = await Product.find({});

    if (products) {
      res.status(200).json(products)
    } else {
      res.status(404).json({ messsage: 'No products found' })
    }
  } catch (error) {
    next(error)
  }
});

//@desc Fetches a single product
//@route GET api/products/:id
//@access Public
const getProduct = asyncHandler(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    if (product) {
      res.status(200).json(product)
    } else {
      return res.status(404).json({ message: 'Product not found' })
    }
  } catch (error) {
    next(error)
  }
})


module.exports = {
  getProducts,
  getProduct,
}


