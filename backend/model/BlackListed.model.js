const mongoose = require("mongoose");

const blackListedTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60*1, // 24 hours in seconds
  },
});

module.exports = mongoose.model("BlacklistedToken", blackListedTokenSchema);
