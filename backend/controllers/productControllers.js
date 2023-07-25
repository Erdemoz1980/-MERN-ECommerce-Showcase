const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel')

//@desc Fetches all products
//@route GET api/products
//@access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  if (products) {
    res.status(200).json(products)
  } else {
    res.status(404).json({messsage:'No products found'})
  }
    
})

//@desc Fetches a single product
//@route GET api/products/:id
//@access Public
const getProduct = asyncHandler(async (req, res) => {

  const product = await Product.findById(req.params.id)
  if (product) {
    res.status(200).json(product)
  } else {
     return res.status(404).json({message:'Product not found'})
  }
 
})

//@desc Creates a product
//@route POST api/products
//@access Public
const createProduct = asyncHandler(async (req, res) => {
  res.status(201).json({message:'A new product has been created'})
})

//@desc Updates a single product
//@route PUT api/products/:id
//@access Private
const updateProduct = asyncHandler(async (req, res) => {
  res.status(200).json({message:`The product No:${req.params.id} has updated`})
})

//@desc Delete a single product
//@route DELETE api/products/:id
//@access Private
const deleteProduct = asyncHandler(async (req, res) => {
  res.status(200).json({message:`The product No:${req.params.id} has been deleted`})
})

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}


