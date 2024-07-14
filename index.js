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
const corsOptions = {
  origin: ["http://localhost:3001"],
  credentials: true, // Required if you're using cookies, authorization headers, etc.
  optionSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());

app.use("/", routes);

// Default route example
app.get("/", (req, res) => {
  res.send("Hello World!");
});
