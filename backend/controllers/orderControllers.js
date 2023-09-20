const { OrderModel } = require('../models/models');
const asyncHandler = require('express-async-handler');

// Create a new order
// POST api/orders
// Public
const createOrder = asyncHandler(async (req, res) => {
  const { user, orderItems, shippingAddress, billingAddress, subTotal,  shippingPrice, taxPrice, totalPrice, paymentType, isPaid  } = req.body;
  
  const createdOrder = await OrderModel.create({user, orderItems, subTotal, shippingAddress, billingAddress, shippingPrice, taxPrice, totalPrice, paymentType, isPaid})

  if (createdOrder) {
    res.status(201).json(createdOrder)
  } else {
    res.status(400)
    throw new Error('Order error, please try again')
  }
});

//@descGET fetches a user's all orders
//@route /api/orders/:id
//@access Private
const getOrderList = asyncHandler(async (req, res) => {
  const orders = await OrderModel.find({ user: req.params.id });

  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(404).json({message:'No previous orders found!'})
  }
})

module.exports = {createOrder, getOrderList}