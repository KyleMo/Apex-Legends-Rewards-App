import express from 'express'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateWebToken.js'

const registerUser = asyncHandler(async (req, res) => {
  const {username, email, password, pic } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists")
  }

  const user = await User.create({
    username,
    email,
    password,
    pic
  })

  if (user) {
    res.status(201).json({
      __id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error("Error occured")
  }

})

const authUser = asyncHandler(async (req, res) => {
  const {username, email, password, pic } = req.body;

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))){
    res.json({
      __id: user._id,
      username: user.username,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id)
    })
  }
  else {
    res.status(400)
    throw new Error("Invalid email or password")
  }
})

const registerGamingAccount = asyncHandler(async (req, res) => {
  const {username, email, password, pic, gamingAccount } = req.body;

  //if gaming account already exists in database then send error, gaming account
  // already taken
  // will have to set up some kind of verification if users are actually the owner
  // of that account

})

export { registerUser, authUser };
