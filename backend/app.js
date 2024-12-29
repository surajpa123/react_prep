const express = require("express");
const dotEnv = require("dotenv");
const connectDb = require("./config/db");
const index = require("./routes");
const router = require("./routes");
const cookieParser = require("cookie-parser")
dotEnv.config();;


const app = express();

app.use(express.json());
app.use(cookieParser())

connectDb()

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World");
});


// all routes
app.use("/api", router)




module.exports = app;
