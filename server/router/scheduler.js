const express = require("express");
const router = express.Router();
//==============================================
const connectDB = require("../config/connectDB.js");
const db = connectDB.init();
connectDB.open(db);
//==============================================
router.get("/", (req, res) => {
  const sqlQuery = "SELECT * FROM event_list";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
    console.log("result", result);
  });
});
//==============================================
router.post("/insert", (req, res) => {
  const event = req.body.event;
  const sqlQuery =
    "INSERT INTO event_list(id,title,start,end) VALUES(?,?,?,?);";
  db.query(
    sqlQuery,
    [event.id, event.title, event.start, event.end],
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
    "UPDATE event_list SET title=?, start=?, end=? WHERE id = ?;";
  db.query(
    sqlQuery,
    [event.title, event.start, event.end, event.id],
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
  const deletedEventId = req.body.deletedEventId;
  const sqlQuery = `DELETE FROM event_list WHERE id = ${deletedEventId};`;
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

module.exports = router;
