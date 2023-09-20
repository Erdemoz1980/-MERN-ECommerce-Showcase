const express = require('express');
const { createOrder, getOrderList } = require('../controllers/orderControllers');

const router = express.Router();

router.route('/').post(createOrder)
router.route('/:id').get(getOrderList)



module.exports = router;