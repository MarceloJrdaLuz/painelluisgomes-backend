require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();


mongoose.connect(
  process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  } 
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(function(req, res, next) {
  var allowedOrigins = [
    "https://luisgomesrn.vercel.app"
  ];
  var origin = req.headers.origin;
  console.log(origin)
  console.log(allowedOrigins.indexOf(origin) > -1)
  // Website you wish to allow to
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,Authorization"
  );
  
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  
  // Pass to next layer of middleware
  next();})

app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);

app.use(require("./src/routes"));

app.listen(process.env.PORT || 3000);
