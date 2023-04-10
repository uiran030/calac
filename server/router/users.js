const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const session = require("express-session");
const cookieParser = require("cookie-parser");

// 인증 미들웨어 추가 ===========================
router.use(cookieParser());
const authMiddleware = (req, res, next) => {
  if (req.cookies && req.cookies.sid) {
    // 쿠키가 있는 경우 인증 성공
    console.log(req.cookies);
    next();
  } else {
    // 쿠키가 없는 경우 로그인 페이지로 이동
    // console.log(req.cookies);
    console.log("외않되", req.cookies);
    res.redirect("/");
  }
};
// =============================================
//세션 생성 관련=================================
const sessionMiddleware = session({
  secret: "my-secret-key", // 세션을 암호화하는데 사용하는 문자열
  resave: false, // 변경 사항이 없어도 항상 세션 저장
  saveUninitialized: true, // 새로운 세션 생성 시에도 세션 저장
  cookie: {
    httpOnly: true,
    // secure: true, // HTTPS 프로토콜에서만 사용 가능
    secure: false, // HTTP 프로토콜로도 가능.
    sameSite: "strict", // CSRF 공격 방지
    maxAge: 1000 * 60 * 60 * 24, // 쿠키 유효기간 (1일)
  },
});
router.use(sessionMiddleware);
// =============================================
// crypto 관련 =================================
// 비밀번호를 해시화 하는 함수
function hashPassword(pwd) {
  // salt생성
  const salt = crypto.randomBytes(16);
  // 해시 함수 생성 (pbkdf2Syncg는 해시화 알고리즘)
  const hash = crypto.pbkdf2Sync(pwd, salt, 1000, 64, "sha512");
  return { salt, hash };
}
// 비밀번호 확인 함수
function verifyPassword(pwd, hash, salt) {
  const hashVerify = crypto.pbkdf2Sync(pwd, salt, 1000, 64, "sha512");
  return hash.toString("hex") === hashVerify.toString("hex");
}
// =============================================
// DB 연결부 ===================================
const connectDB = require("../config/connectDB.js");
const db = connectDB.init();
connectDB.open(db);
//=============================================

// 이하 데이터 처리부 ########################################################

//로그인 =======================================
router.post("/login", (req, res) => {
  const user_id = req.body.id;
  // const user_pwd = req.body.pwd;
  const sqlQuery = "SELECT * FROM users WHERE user_id = ?;";
  db.query(sqlQuery, [user_id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const isAuthenticated = verifyPassword(
        req.body.pwd,
        // user_hash,
        // user.salt
        result[0].user_hash,
        result[0].user_salt
      );
      // console.log("일치정보", isAuthenticated);
      if (isAuthenticated) {
        // 사용자 정보를 포함하는 세션 객체 생성
        const userInfo = {
          no: result[0].user_no,
          id: result[0].user_id,
          name: result[0].user_name,
          phone: result[0].user_phone,
          gender: result[0].user_gender,
          birth: result[0].user_birth,
          quiz: result[0].user_quiz,
          answer: result[0].user_answer,
          email: result[0].user_email,
          createdAt: result[0].user_createdAt,
          updatedAt: result[0].user_updatedAt,
        };

        req.session.userInfo = userInfo; // 세션객체에 로그인 정보 저장
        console.log("확인들어갑니다잉", req.session.userInfo);
        res.cookie("sid", req.sessionID, {
          maxAge: 1000 * 60 * 60 * 24,
          domain: "localhost",
        }); // 세션 ID를 브라우저에 sid쿠키로 저장
        res.send(userInfo); //필요 없을 듯.? 이 아니네 이거 없으면 쿠키 안생김 왜.,.?
      } else {
        res.send("Login failed");
      }
    }
  });
});
//===============================================
// 세션 객체에서 현재 사용자 정보 받아오기 ========
router.get("/user-info", (req, res) => {
  const userInfo = req.session.userInfo; // 세션 객체에서 유저 정보를 가져옴
  console.log(userInfo);
  if (userInfo) {
    // 유저 정보가 있으면 JSON 형태로 응답
    res.cookie("sid", req.session.id, { maxAge: 1000 * 60 * 60 * 24 }); // 세션 ID를 쿠키에 저장
    res.status(200).json({ success: true, userInfo });
  } else {
    // 유저 정보가 없으면 401 Unauthorized 에러 반환
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
});
// =============================================
//회원가입 =======================================
router.post("/insert", (req, res) => {
  const { salt, hash } = hashPassword(req.body.pwd);
  const user_id = req.body.id;
  const user_salt = salt;
  const user_hash = hash;
  const user_name = req.body.name;
  const user_birth = req.body.birth;
  const user_gender = req.body.gender;
  const user_phone = req.body.phone;
  const user_quiz = req.body.quiz;
  const user_answer = req.body.answer;
  const user_email = req.body.emailId + req.body.emailDomains;
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
//비밀번호 찾기 본인인증 =========================
router.get("/findPw", (req, res) => {
  const inputId = req.query.inputId;
  const inputQuiz = req.query.inputQuiz;
  const inputAnswer = req.query.inputAnswer;
  const sqlQuery = `SELECT user_quiz, user_answer FROM users WHERE user_id = ?;`;
  db.query(sqlQuery, [inputId], (err, result) => {
    if (err) throw err;
    if (
      inputQuiz === result[0].user_quiz &&
      result[0].user_answer === inputAnswer
    ) {
      console.log(true);
      res.send(true);
    } else {
      console.log(false);
      res.send(false);
    }
  });
});
//==============================================
// 비밀번호 변경 ================================
router.put("/findPw/changePw", (req, res) => {
  const { salt, hash } = hashPassword(req.body.newPwd);
  const user_id = req.body.id;
  const user_salt = salt;
  const user_hash = hash;
  const sqlQuery =
    "UPDATE users SET user_salt=?, user_hash=? WHERE user_id = ?;";
  db.query(sqlQuery, [user_salt, user_hash, user_id], (err, result) => {
    console.log(result);
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
//==============================================

module.exports = router;
