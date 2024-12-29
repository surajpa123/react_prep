const jwt = require("jsonwebtoken");
const user = require("../model/User.model");
const BlackListedModel = require("../model/BlackListed.model");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const isBlackListed = await BlackListedModel.findOne({
      token: token,
    });
    
    if (isBlackListed) return res.status(401).json({ message: "Unauthorized" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const userExists = await user.findById(payload);
    if (!userExists) return res.status(401).json({ message: "Unauthorized" });

    req.user = userExists;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = verifyToken;
