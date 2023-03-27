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
// ledger page의 show data
router.get('/', (req, res) => {
  const currentMonthDataQuery = `SELECT ledger_category, SUM(ledger_count) AS sum_count FROM ledger WHERE ledger_createdAt LIKE '${currentMonth}%' and ledger_type='expense'GROUP BY ledger_category;`
  const monthlyCategoryQuery = "SELECT ledger_category, DATE_FORMAT(ledger_createdAt, '%Y-%m') AS current_month, SUM(ledger_count) AS monthly_sum_count FROM ledger WHERE ledger_type='expense' GROUP BY current_month, ledger_category ORDER BY current_month ASC;"
  db.query( currentMonthDataQuery + monthlyCategoryQuery, (err, result) => {
    res.send(result);
    console.log("result", result);
  });
});

// ledger page의 show total data
router.get('/total', (req, res) => {
  const monthlyTotalQuery = `SELECT ledger_type, SUM(ledger_count) AS sum_count FROM ledger where ledger_createdAt LIKE '${currentMonth}%' GROUP BY ledger_type;`
  const expenseQuery = `SELECT * from ledger WHERE ledger_createdAt LIKE '${currentMonth}%' and ledger_type='expense' order BY ledger_createdAt desc LIMIT 3;`
  const incomeQuery = `SELECT * from ledger WHERE ledger_createdAt LIKE '${currentMonth}%' and ledger_type='income' order BY ledger_createdAt desc LIMIT 3;`
  db.query(monthlyTotalQuery + expenseQuery + incomeQuery, (err, result) => {
    res.send(result);
    console.log("result", result);
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
    // console.log('result', result);
    console.log("req", req.body);
  });
});

module.exports = router;
