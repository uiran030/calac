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
  const title = req.body.title;
  const start = req.body.start;
  const end = req.body.end;
  const sqlQuery = "INSERT INTO event_list(title,start,end) VALUES(?,?,?);";
  db.query(sqlQuery, [title, start, end], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(req.body);
      console.log("result", result);
      console.log("req.body", req.body);
    }
  });
});
//==============================================
router.put("/edit/:id", (req, res) => {
  const title = req.body.title;
  const start = req.body.start;
  const end = req.body.end;
  const id = req.params.id;
  const sqlQuery =
    "UPDATE event_list SET title=?, start=?, end=? WHERE id = ?;";
  db.query(sqlQuery, [title, start, end, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(res.body);
      console.log("result", result);
      console.log("req.body", req.body);
    }
  });
});
//==============================================
router.delete("/delete/:id", (req, res) => {
  // console.log("함보여줘라!", req.params.id);
  const id = req.params.id;
  // const deletedEventId = req.body.deletedEventId;
  const sqlQuery = `DELETE FROM event_list WHERE id = ${id};`;
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
