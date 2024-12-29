const express = require("express");
const { signUp, login, getProfile, logout } = require("../controller/userController");
const { body } = require("express-validator");
const verifyToken = require("../middleware/auth");

const userRoute = express.Router();

userRoute.post(
  "/signup",
  body("fullName.firstName")
    .isLength({ min: 3 })
    .withMessage("Full name should be at least 3 characters"),
  body("email").isEmail().withMessage("Please enter your email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  signUp
);

userRoute.post(
  "/login",
  body("email").isEmail().withMessage("Please enter your email"),
  login
);

userRoute.get("/getUser", verifyToken, getProfile);

userRoute.post("/logout", verifyToken, logout);

module.exports = userRoute;
