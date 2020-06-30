require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
//importing routes
const postRoute = require("./Routes/posts");
//middleware
app.use("/posts", postRoute);
//cors is used to allow the api to be called across domains
app.use(cors());

mongoose.connect(process.env.DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

//home route
app.get("/", (req, res) => {
  res.send("Welcome to Home");
});

//Connect db
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("CONNECTION TO DATABASE SUCCESFUL!");
  }
);

//Connection, listening to server
app.listen(3000, () => console.log("Server Started "));
