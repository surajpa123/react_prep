const mongoose = require("mongoose");
const createUser = require("../services/user.services");
const { validationResult } = require("express-validator");
const UserModel = require("../model/User.model");
const BlackListedModel = require("../model/BlackListed.model");

exports.signUp = async (req, res) => {
  //show  express validation error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, password } = req.body;

  try {
    //check if user already exists
    const user = await UserModel.findOne({ email });
    if (user)
      return res.status(400).json({ errors: { msg: "User already exists" } });

    const newUser = await createUser(fullName, email, password);

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await UserModel.findOne({ email: req.body.email }).select(
      "+password"
    );

    if (!user) {
      return res.status(400).json({ errors: { msg: "User not found" } });
    }
    console.log(user);
    const isMatch = user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(400).json({ errors: { msg: "Invalid credentials" } });
    }

    const token = user.generateToken();

    // send token in cookies
    res.cookie("token", token, { expiresIn: "3d" }).json({
      success: true,
      data: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        lastLoggedIn: user.lastLoggedIn,
      },
    });

    // send user data
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.logout = async (req, res) => {
  try {
    await BlackListedModel.create({
      token: req.cookies.token,
    });
    res.clearCookie("token").json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
