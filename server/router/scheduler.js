const express = require("express");
const router = express.Router();
// 쿠키사용시 추가 ============================== (보류, 카테고리 안 받아와짐)
// const { sessionMiddleware, authMiddleware, cookieParser } = require("./users");
// router.use(cookieParser());
// router.use(sessionMiddleware);
// router.use(authMiddleware);
//DB연결부 =====================================
const connectDB = require("../config/connectDB.js");
const db = connectDB.init();
connectDB.open(db);
// 이벤트 데이터 받아오기 =========================
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
  const color = req.body.color;
  const locale = req.body.locale;
  const sqlQuery =
    "INSERT INTO event_list(title,start,end,color,locale) VALUES(?,?,?,?,?);";
  db.query(sqlQuery, [title, start, end, color, locale], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const newEvent = {
        id: result.insertId, // Get the newly inserted id
        title,
        start,
        end,
        color,
        locale,
      };
      res.send(newEvent);
    }
  });
});
//==============================================
router.put("/update/:id", (req, res) => {
  const title = req.body.title;
  const start = req.body.start;
  const end = req.body.end;
  const color = req.body.color;
  const locale = req.body.locale;
  const id = req.params.id;
  const sqlQuery =
    "UPDATE event_list SET title=?, start=?, end=?, color=?, locale=? WHERE id = ?;";
  db.query(sqlQuery, [title, start, end, color, locale, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const updatedEvent = {
        id: req.params.id,
        title,
        start,
        end,
        color,
        locale,
      };
      res.send(updatedEvent);
    }
  });
});
//==============================================
router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
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

// //==============================================
router.get("/category", (req, res) => {
  const sqlQuery = "SELECT * FROM category_list";
  db.query(sqlQuery, (err, result) => {
    if (err) {
      // res.send(result);
      console.log("뭔디result", err);
    } else {
      res.send(result);
      console.log("뭔디result", result);
    }
  });
});
// //==============================================
router.post("/category/insert", (req, res) => {
  const value = req.body.value;
  const label = req.body.label;
  const sqlQuery = "INSERT INTO category_list(value,label) VALUES(?,?);";
  db.query(sqlQuery, [value, label], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const newCategory = {
        id: result.insertId, // Get the newly inserted id
        value,
        label,
      };
      res.send(newCategory);
    }
  });
});
//==============================================
router.put("/category/update/:id", (req, res) => {
  const value = req.body.value;
  const label = req.body.label;
  const id = req.params.id;
  const sqlQuery = "UPDATE category_list SET value=?, label=? WHERE id = ?;";
  db.query(sqlQuery, [value, label, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const updatedCategory = {
        id: req.params.id,
        value,
        label,
      };
      res.send(updatedCategory);
    }
  });
});
//==============================================
router.delete("/category/delete/:id", (req, res) => {
  const id = req.params.id;
  const sqlQuery = `DELETE FROM Category_list WHERE id = ${id};`;
  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("success!");
    }
  });
});

//=====================================

router.put("/event/color/update/:value", (req, res) => {
  const newvalue = req.body.color;
  const prevalue = req.params.value;
  const sqlQuery = "UPDATE event_list SET color=? WHERE color = ?;";
  db.query(sqlQuery, [newvalue, prevalue], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send({ message: "Updated successfully" });
    }
  });
});

//====================================

router.delete("/event/color/delete/:value", (req, res) => {
  const prevalue = req.params.value;
  const sqlQuery = `DELETE FROM event_list WHERE color = ?;`;
  db.query(sqlQuery, [prevalue], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send({ message: "Deleted successfully" });
    }
  });
});

module.exports = router;
