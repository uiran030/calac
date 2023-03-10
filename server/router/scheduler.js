const express = require("express");
const router = express.Router();
//==============================================
const connectDB = require("../config/connectDB.js");
const db = connectDB.init();
connectDB.open(db);
//==============================================
router.get("/", (req, res) => {
  const sqlQuery = "select * from event_list";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
    console.log("result", result);
  });
});
//==============================================
router.post("/insert", (req, res) => {
  const event = req.body.event;
  const sqlQuery =
    "INSERT INTO event_list(event_id,scheduler_no,title,start,end,color,locale,description,reminder,reminderMethod) VALUES(?,?,?,?,?,?,?,?,?,?);";
  db.query(
    sqlQuery,
    [
      event.event_id,
      event.scheduler_no,
      event.title,
      event.start,
      event.end,
      event.color,
      event.locale,
      event.description,
      event.remainder,
      event.remainderMethod,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success!");
        console.log("result", result);
        console.log("req.body", req.body);
      }
    }
  );
});
//==============================================
router.post("/edit", (req, res) => {
  const event = req.body.event;
  const sqlQuery =
    "UPDATE event_list SET title=?,start=?,end=?,color=?,locale=?,description=?,reminder=?,reminderMethod=? WHERE event_id = ?;";
  db.query(
    sqlQuery,
    [
      event.title,
      event.start,
      event.end,
      event.color,
      event.locale,
      event.description,
      event.remainder,
      event.remainderMethod,
      event.event_id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success!");
        console.log("result", result);
        console.log("req.body", req.body);
      }
    }
  );
});
//==============================================
router.post("/delete", (req, res) => {
  const deletedId = req.body.deletedId;
  console.log("여기야", deletedId);
  const sqlQuery = `DELETE FROM event_list WHERE event_id = ${deletedId};`;
  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("success!");
      console.log("result", result);
      console.log("req.body", req.body);
    }
  });
});

//============================================
module.exports = router;
