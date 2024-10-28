const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const materials = require("./api/materials");
const tools = require("./api/tools");
const peoples = require("./api/peoples");
const users = require("./api/users");
const activities = require("./api/activities");
const settings = require("./api/settings");
const dishes = require("./api/dishes");
const orderlists = require("./api/orderlists");
const orders = require("./api/orders");
const history = require("./api/history");

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("upload"));

// Connect to MongoDB
const mongourl = require("./config/config").mongoURI;
// const mongourl =
// "mongodb+srv://cmon:cmon@cmondb.vfrm2t1.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongourl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Use Routes
app.use("/api/materials", materials);
app.use("/api/tools", tools);
app.use("/api/peoples", peoples);
app.use("/api/users", users);
app.use("/api/activities", activities);
app.use("/api/settings", settings);
app.use("/api/dishes", dishes);
app.use("/api/orderlists", orderlists);
app.use("/api/orders", orders);
app.use("/api/history", history);

const port = require("./config/config").port;
app.listen(port, () => console.log(`Server running on port ${port}`));
