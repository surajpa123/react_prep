const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_HOST);
    console.log(process.env.DB_HOST)
    console.log("MongoDB Connected...");

  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

module.exports = connectDb;
