const express = require("express");
const app = express();

// get port number from environment settings
require('dotenv').config();
const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/user.route");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// match GET localhost:4000/
app.get("/", (req, res)=>{
  res.send("Test API for ExpressJS");
});

// ใช้ userRoute เมื่อ request ขึ้นต้นด้วย /users-
app.use("/users", userRoute); 

app.listen(port, () => {
  console.log("App started at port: " + port);
});