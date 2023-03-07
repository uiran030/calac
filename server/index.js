const express = require('express');
const app = express();
const mysql = require('mysql');
const PORT = 5000;
const cors = require('cors');
const bodyParser = require('body-parser');
const {urlencoded} = require('body-parser');

const db = mysql.createPool({
  host : 'localhost',
  user : 'root',
  password : '1234',
  database : 'calacDB'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
// app.get('/api', (req, res) => {
//   const sqlQuery = "select * from testtable;"
//   db.query(sqlQuery, (err, result) => {
//     res.send(result);
//     console.log('result', result);
//   })
// });

// ledger page의 data
app.get('/ledger', (req, res) => {
    const sqlQuery = "select * from ledger;"
    db.query(sqlQuery, (err, result) => {
      res.send(result);
      console.log('result', result);
    })
  });

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});