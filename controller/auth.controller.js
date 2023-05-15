const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../models");
const User = db.User;
const jwtUtil = require('../util/jwt.util')

// Sign Up
router.post("/register", async (request, response) => {
  const encryptedPassword = await bcrypt.hash(request.body.password, 10);

  const user = await User.create({
    email: request.body.email,
    gender: request.body.gender,
    password: encryptedPassword,
    role: request.body.role,
  });

  return response.status(201).json({ data: user });
});

// Sign In
router.post("/login", async (request, response) => {
  const user = await User.findOne({ where: { email: request.body.email } });

  if (!user)
    return response
      .status(401)
      .json({ message: "Unauthenticated user or not registered user" });

  const validatePassword = await bcrypt.compare(
    request.body.password,
    user.password
  );

  if (!validatePassword)
    return response.status(401).json({ message: "Invalid password" });

  const token = jwtUtil.generateToken(user);

  return response.status(201).json({ auth_token: token });
});

module.exports = router;
