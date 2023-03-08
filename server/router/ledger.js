const express = require('express');
const router = express.Router();
//==============================================
const connectDB = require('../config/connectDB.js');
const db = connectDB.init();
connectDB.open(db);
//==============================================
router.get('/',(req,res) => {
  const sqlQuery = "select * from ledger"
    db.query(sqlQuery, (err, result) => {
      res.send(result);
      console.log('result', result);
    })
});

module.exports = router;