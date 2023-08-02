const express = require('express');
const sendMail = require('../controllers/mailController');
const router = express.Router();


router.route('/').post(sendMail)


module.exports = router;