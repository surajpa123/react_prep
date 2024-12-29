const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be at least 8 characters long"],
      select: false,
    },
    fullName: {
      firstName: {
        type: String,
        required: true,
        minlength: [2, "First name must be at least 2 characters long"],
        maxlength: [50, "First name cannot be longer than 50 characters"],
      },
      lastName: {
        type: String,
        minlength: [2, "Last name must be at least 2 characters long"],
        maxlength: [50, "Last name cannot be longer than 50 characters"],
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },

    lastLoggedIn: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function () {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
});


userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

userSchema.methods.generateToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET , {
    expiresIn: "24h",
  });
  return token;
};


module.exports = mongoose.model("User", userSchema);
