import express from 'express'

const registerUser = async (req, res) => {
  const {name, email, password } = req.body;

  res.json({
    name,
    email
  });
}

export default registerUser;
