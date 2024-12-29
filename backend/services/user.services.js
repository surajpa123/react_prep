const mongoose = require("mongoose");
const UserModel = require("../model/User.model");

async function createUser(fullName, email, password) {
  if (!fullName || !email || !password) {
    throw new Error("All fields are required");
  }

  try {
    const newUser = await UserModel.create({
      fullName,
      email,
      password,
    });

    newUser.password = undefined;

    return newUser;
  } catch (error) {
    throw error;
  }
}

module.exports = createUser;
