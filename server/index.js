const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const cors = require("cors");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
//==============================================
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
//==============================================
// const DASHBOARD = require('./router/dashboard.js');
// app.use('/dashboard',DASHBOARD);

const LEDGER = require("./router/ledger.js");
app.use("/ledger", LEDGER);

const DAIRY = require("./router/dairy.js");
app.use("/dairy", DAIRY);

const SCHEDULER = require("./router/scheduler.js");
app.use("/scheduler", SCHEDULER);

const USERS = require("./router/users.js");
app.use("/users", USERS);
//==============================================
app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
