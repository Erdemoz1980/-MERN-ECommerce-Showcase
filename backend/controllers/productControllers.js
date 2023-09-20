const asyncHandler = require('express-async-handler');
const { ProductModel } = require('../models/models.js')

//@desc Fetches all products
//@route GET api/products
//@access Public
const getProducts = asyncHandler(async (req, res, next) => {
  const searchTerm = req.query.searchterm;
  try {
    let query = {}

    if (searchTerm) {
      const searchTermsArray = searchTerm.split(' ').filter(term => term.length > 0);// Remove multiple spaces if they exist.
      const searchTermRegexArray = searchTermsArray.map(term => new RegExp(term, 'i'))
        ;
      query = {
        $or: [
          { company:{$in: searchTermRegexArray} }, //$in operator to match any terms in the provided field.
          { name: {$in: searchTermRegexArray}},
          { category:{$in: searchTermRegexArray} },
          { gender: {$in: searchTermRegexArray} },
          { description: { $in: searchTermRegexArray } },
        ]
      }
    }
    const products = await ProductModel.find(query);

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
    const product = await ProductModel.findById(req.params.id)
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


