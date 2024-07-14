const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

// Routes
const routes = require("./routes/index");
const path = require("path");

const dbConnect = require("./db/dbconnect");
dbConnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Enable CORS for specific origins

app.use(cookieParser());
app.use(express.json());

app.use("/", routes);

// Default route example
app.get("/", (req, res) => {
  res.send("Hello World!");
});
