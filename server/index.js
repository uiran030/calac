const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const cors = require("cors");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const path = require("path");
//==============================================
// app.use(cors());
app.use(
  cors({
    origin: "http://calac.cafe24app.com",
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
//==============================================
const DASHBOARD = require('./router/main.js');
app.use('/dashboard',DASHBOARD);

const LEDGER = require("./router/ledger.js");
app.use("/ledger", LEDGER);

const DIARY = require("./router/diary.js");
app.use("/diary", DIARY);

const COMMENTS = require("./router/comments.js");
app.use("/comments", COMMENTS);

const SCHEDULER = require("./router/scheduler.js");
app.use("/scheduler", SCHEDULER);

const USERS = require("./router/users.js");
app.use("/users", USERS);

// images 폴더 내의 파일들을 외부로 노출 시켜주기 위한 미들웨어
app.use("/images", express.static(path.join(__dirname, "/images")));
//==============================================
app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
