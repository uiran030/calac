const express = require("express");
const router = express.Router();
//==============================================
const connectDB = require("../config/connectDB.js");
const db = connectDB.init();
connectDB.open(db);
//==============================================
// router.get('/',(req,res) => {
//   const sqlQuery = "select * from users"
//     db.query(sqlQuery, (err, result) => {
//       res.send(result);
//       console.log('result', result);
//     })
// });
//==============================================
router.post("/insert", (req, res) => {
  const user_id = req.body.id;
  const user_pwd = req.body.pwd;
  const user_name = req.body.name;
  const user_birth = req.body.birth;
  const user_gender = req.body.gender;
  const user_phone = req.body.phone;
  const sqlQuery =
    "INSERT INTO users(user_id,user_pwd,user_name,user_birth,user_gender,user_phone) VALUES(?,?,?,?,?,?);";
  db.query(
    sqlQuery,
    [user_id, user_pwd, user_name, user_birth, user_gender, user_phone],
    (err, result) => {
      console.log(result);
      if (err) {
        console.log(err);
      } else {
        const newEvent = {
          // id: result.insertId, // Get the newly inserted id
          user_id,
          user_pwd,
          user_name,
          user_birth,
          user_gender,
          user_phone,
          // title,
          // start,
          // end,
          // color,
          // locale,
        };
        res.send(newEvent);
      }
    }
  );
});
//==============================================

module.exports = router;
