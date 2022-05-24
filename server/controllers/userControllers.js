import express from 'express'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateWebToken.js'

const registerUser = asyncHandler(async (req, res) => {
  const {username, email, password, pic } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists.")
  }

  const user = await User.create({
    username,
    email,
    password,
    pic,
  })

  if (user) {
    res.status(201).json({
      __id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
      token: generateToken(user._id),
      linkedAccounts: user.linkedAccounts
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
      token: generateToken(user._id),
      linkedAccounts: user.linkedAccounts
    })
  }
  else {
    res.status(400)
    throw new Error("Invalid email or password")
  }
})

const registerLinkedAccount = asyncHandler(async (req, res) => {
  const {email, platformUserIdentifier, platform } = req.body;

  const user = await User.findOne({email}); //to check length of added accounts
  const profileExists = await User.findOne({
      linkedAccounts: {$elemMatch: {platformUserIdentifier: platformUserIdentifier, platform: platform}}
  })

  if (profileExists){
    res.status(400);
    throw new Error("This gaming profile has already been linked")
  }

  if (user.linkedAccounts.length >= 3){
    res.status(400);
    throw new Error("Cannot link more than 3 accounts")
  }

  const options = {
    new: true
  }
  const userToUpdate = await User.findOneAndUpdate(
      {email},
      {$push: {linkedAccounts: {platformUserIdentifier: platformUserIdentifier, platform: platform}}},
      options
    );

  if (userToUpdate) {
    res.status(201).json({
      __id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
      token: generateToken(user._id),
      linkedAccounts: user.linkedAccounts
    })
  } else {
    res.status(400)
    throw new Error("Error occured. Link not successful.")
  }

});

export { registerUser, authUser, registerLinkedAccount };
