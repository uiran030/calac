const express = require('express');
const router = express.Router();
//==============================================
const connectDB = require('../config/connectDB.js');
const db = connectDB.init();
connectDB.open(db);
//==============================================
// ledger page의 show data
router.get('/', (req, res) => {
  const selectQuery = "SELECT * FROM ledger;"
  const expenseQuery = "SELECT * from ledger WHERE ledger_type='expense' order BY ledger_createdAt desc LIMIT 3;"
  const incomeQuery = "SELECT * from ledger WHERE ledger_type='income' order BY ledger_createdAt DESC LIMIT 3;"
  db.query(selectQuery + expenseQuery + incomeQuery, (err, result) => {
    res.send(result);
    console.log('result', result);
  })
});

// ledger page의 insert
router.post('/insert', (req, res) => {
  const category = req.body.category;
  const type = req.body.type;
  const description = req.body.description;
  const count = req.body.count;
  const insertQuery = `INSERT INTO ledger (ledger_category, ledger_type, ledger_description, ledger_count) VALUES ('${category}', '${type}', '${description}', '${count}');`
  db.query(insertQuery, (err, result) => {
    res.send('success!!!!!!!!!!');
    // console.log('result', result);
    console.log('req', req.body);
  })
});

module.exports = router;