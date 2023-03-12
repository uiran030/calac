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
      event.reminder,
      event.reminderMethod,
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
router.get("/category", (req, res) => {
  const sqlQuery = "SELECT * FROM category_list WHERE user_no = 1";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
    console.log("result", result);
  });
});
//============================================
router.post("/category/insert", (req, res) => {
  const newCategory = req.body.newCategory;
  const sqlQuery =
    "INSERT INTO category_list(user_no,text,value) VALUES(?,?,?);";
  db.query(
    sqlQuery,
    [newCategory.user_no, newCategory.text, newCategory.value],
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

//============================================
router.post("/category/edit", (req, res) => {
  const editedCategoryObj = req.body.editedCategoryObj;
  const sqlQuery = "UPDATE category_list SET text=? WHERE id = ?;";
  db.query(
    sqlQuery,
    [editedCategoryObj.text, editedCategoryObj.id],
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
//============================================
router.post("/category/delete", (req, res) => {
  const deletedId = req.body.deletedId;
  const sqlQuery = `DELETE FROM category_list WHERE id = ${deletedId};`;
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
