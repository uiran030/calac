const express = require("express");
const router = express.Router();
const crypto = require("crypto");
// crypto ======================================
// 비밀번호를 해시화 하는 함수
function hashPassword(password) {
  // salt생성
  const salt = crypto.randomBytes(16); /* .toString("hex") */ // 이게 있으면 문자열로 반환돼서 BINARY자료형에 안 담긴다.
  // 해시 함수 생성 (pbkdf2Syncg는 해시화 알고리즘)
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512");
  /* .toString("hex") */ return { salt, hash };
}
// 비밀번호 확인 함수
function verifyPassword(password, hash, salt) {
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return hash === hashVerify;
}

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
//회원가입 =======================================
router.post("/insert", (req, res) => {
  const { salt, hash } = hashPassword(req.body.pwd);
  const user_id = req.body.id;
  // const user_pwd = req.body.pwd;
  const user_salt = salt;
  const user_hash = hash;
  const user_name = req.body.name;
  const user_birth = req.body.birth;
  const user_gender = req.body.gender;
  const user_phone = req.body.phone;
  const user_quiz = req.body.quiz;
  const user_answer = req.body.answer;
  const user_email = req.body.emailId + req.body.emailDomains;
  // console.log("소금", typeof salt, "해쉬브라운 먹고싶다", hash);
  const sqlQuery =
    "INSERT INTO users(user_id,user_salt,user_hash,user_name,user_birth,user_gender,user_phone,user_quiz,user_answer,user_email) VALUES(?,?,?,?,?,?,?,?,?,?);";
  db.query(
    sqlQuery,
    [
      user_id,
      user_salt,
      user_hash,
      user_name,
      user_birth,
      user_gender,
      user_phone,
      user_quiz,
      user_answer,
      user_email,
    ],
    (err, result) => {
      console.log(result);
      if (err) {
        console.log(err);
      } else {
        const newEvent = {
          user_no: result.insertId, // Get the newly inserted id
          user_id,
          user_salt,
          user_hash,
          user_name,
          user_birth,
          user_gender,
          user_phone,
          user_quiz,
          user_answer,
          user_email,
        };
        res.send(newEvent);
      }
    }
  );
});
//==============================================
//아이디 중복확인================================
router.get("/duplicatedId", (req, res) => {
  const inputId = req.query.inputId;
  const sqlQuery = `SELECT user_id FROM users WHERE user_id = '${inputId}';`;
  db.query(sqlQuery, (err, result) => {
    if (err) throw err;
    res.send(result);
    console.log("result", result);
  });
});
//==============================================
//아이디 찾기 ===================================
router.get("/findId", (req, res) => {
  const name = req.query.name;
  const email = req.query.emailId + req.query.emailDomains;
  const sqlQuery = `SELECT user_id FROM users WHERE user_name = ? AND user_email = ?;`;
  db.query(sqlQuery, [name, email], (err, result) => {
    if (err) throw err;
    res.send(result);
    console.log("result", result);
  });
});
//==============================================

module.exports = router;
