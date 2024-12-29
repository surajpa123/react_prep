const userRoute = require("./userRoutes");

const router = require("express").Router();

router.use("/users", userRoute);

module.exports = router;
