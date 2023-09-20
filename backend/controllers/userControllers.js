const { UserModel } = require('../models/models');
const asyncHandler = require('express-async-handler');

//@desc  Registers a new user
//@route POST api/users/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  let { name, lastName, email, password, address } = req.body
  name = name[0].toUpperCase() + name.substring(1, name.length)
  lastName = lastName[0].toUpperCase() + lastName.substring(1, lastName.length)
  email = email.toLowerCase()

  const userExists = await UserModel.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'Another account is already registered with your email!' })
  }

  const user = await UserModel.create({
    name, lastName, email, password, address
  });
  
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      address: user.address
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
});

//@desc  Logs in user
//@route POST api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  let { email, password } = req.body;
  email = req.body.email.toLowerCase()

  const user = await UserModel.findOne({ email });
  if (!user || (user.password !== password)) {
    res.status(401)
    throw new Error('Invalid email or password!')
  } else {
    res.status(200).json(user)
  }
});

//@desc  Updates user profile
//@route PUT api/users/profile/update/:id
//@access Public
const updateUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const userData = req.body;
  const formattedUserData = {
    ...userData,
    name: userData.name[0].toUpperCase() + userData.name.substring(1, userData.name.length).toLowerCase(),
    lastName:userData.lastName[0].toUpperCase() + userData.lastName.substring(1, userData.lastName.length).toLowerCase()
  }
 

    const updatedUser = await UserModel.findByIdAndUpdate(userId, formattedUserData, { new: true });
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404)
      throw new Error('Unable to update user!')
    }
});

//@desc  Updates user password
//@route PUT api/users/update/:id
//@access Private
const updatePassword = asyncHandler(async (req, res) => {
  const userId = req.params.id
  const { oldPassword, newPassword } = req.body;

  const user = await UserModel.findById(userId);
  if (!user || user.password !== oldPassword) {
    res.status(401)
    throw new Error('Incorrect password! Plase try again')
  } else {
    if (user.password === newPassword) {
      res.status(400)
      throw new Error('Your new password should not match the old one')
    }
    const updatedUser = await UserModel.findByIdAndUpdate(userId, {password:newPassword}, { new: true });
    if (updatedUser) {
      return res.status(200).json(updatedUser)
    } else {
      res.status(401)
      throw new Error('Unable to change password, please try again')
    }
  }
});


module.exports = {
  registerUser,
  loginUser,
  updateUser,
  updatePassword
}
