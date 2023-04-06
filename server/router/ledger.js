const express = require("express");
const router = express.Router();
//==============================================
const connectDB = require("../config/connectDB.js");
const db = connectDB.init();
connectDB.open(db);
//======================================================
// 날짜
let today = new Date();
let year = today.getFullYear();
let month = ("0" + ( today.getMonth() + 1 )).slice(-2);
let currentMonth = year+'-'+month;
//======================================================
// ledger page의 expense에 대한 이번달 카테고리별 total 데이터
router.get('/', (req, res) => {
  let type = req.query.type;
  const currentMonthCategoryDataQuery = `SELECT ledger_category, SUM(ledger_count) AS sum_count FROM ledger WHERE ledger_createdAt LIKE '${currentMonth}%' and ledger_type='expense'GROUP BY ledger_category;`
  const currentMonthlyQuery = `SELECT * FROM ledger WHERE ledger_type = '${type}' AND ledger_createdAt LIKE '${currentMonth}%' order by ledger_createdAt DESC`
  db.query( currentMonthCategoryDataQuery + currentMonthlyQuery, (err, result) => {
    res.send(result);
  });
});

// ledger page의 월별 카테고리 데이터 합계
router.get('/monthlyData', (req, res) => {
  const monthlyCategoryQuery = "SELECT ledger_category, DATE_FORMAT(ledger_createdAt, '%Y-%m') AS current_month, SUM(ledger_count) AS monthly_sum_count FROM ledger WHERE ledger_type='expense' GROUP BY current_month, ledger_category ORDER BY current_month ASC;"
  db.query( monthlyCategoryQuery, (err, result) => {
    res.send(result);
    // console.log("result", result);
  });
});


// ledger page의 현재 달의 타입별(지출 or 수입)의 총액과 최근 3개
router.get('/total', (req, res) => {
  let type = req.query.type;
  const monthlyTotalQuery = `SELECT ledger_type, SUM(ledger_count) AS sum_count FROM ledger WHERE ledger_createdAt LIKE '${currentMonth}%' AND ledger_type='${type}';`
  const topThreeQuery = `SELECT * from ledger WHERE ledger_createdAt LIKE '${currentMonth}%' and ledger_type='${type}' order BY ledger_createdAt desc LIMIT 3;`
  db.query(monthlyTotalQuery + topThreeQuery, (err, result) => {
    res.send(result);
  });
});

// ledger page의 현재 달의 목표 지출액 (추후에 redux로 연결할 예정)
router.get('/goal', (req, res) => {
  const goalMoneyQuery = `SELECT * FROM goal_money where money_createdAt LIKE '${currentMonth}%'`
  db.query(goalMoneyQuery, (err, result) => {
    res.send(result);
  });
});

// ledger page의 insert
router.post("/insert", (req, res) => {
  const category = req.body.category;
  const type = req.body.type;
  const description = req.body.description;
  const count = req.body.count;
  const insertQuery = `INSERT INTO ledger (ledger_category, ledger_type, ledger_description, ledger_count) VALUES ('${category}', '${type}', '${description}', '${count}');`;
  db.query(insertQuery, (err, result) => {
    res.send("success!!!!!!!!!!");
  });
});

// ledger page의 delete
router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const insertQuery = `DELETE FROM ledger WHERE ledger_no = ${id}`;
  db.query(insertQuery, (err, result) => {
    res.send("success!!!!!!!!!!");
  });
});

module.exports = router;
