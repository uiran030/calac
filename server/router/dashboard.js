const express = require('express');
const router = express.Router();
//==============================================
const connectDB = require('../config/connectDB.js');
const db = connectDB.init();
connectDB.open(db);
//==============================================
// dashboard page의 goal data
router.get('/dashboard/goal', (req, res) => {
  const selectQuery = "select * from goal"
  db.query(selectQuery, (err, result) => {
    res.send(result);
    console.log('result', result);
  })
});