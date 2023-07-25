const express = require('express');
const { registerUser, loginUser, updateUser, updatePassword } = require('../controllers/userControllers');
const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/profile/update/:id').put(updateUser)
router.route('/password/update/:id').put(updatePassword)

module.exports = router;