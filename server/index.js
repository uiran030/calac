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

// dashboard page의 goal data
app.get('/goal', (req, res) => {
  const selectQuery = "select * from goal;"
  db.query(selectQuery, (err, result) => {
    res.send(result);
    console.log('result', result);
  })
});

// ledger page의 show data
app.get('/ledger', (req, res) => {
  const selectQuery = "select * from ledger;"
  db.query(selectQuery, (err, result) => {
    res.send(result);
    console.log('result', result);
  })
});
// ledger page의 add
app.post('/ledger/insert', (req, res) => {
  console.log('req', req.data)
  const category = req.body.category;
  const type = req.body.type;
  const description = req.body.description;
  const count = req.body.count;
  const insertQuery = `INSERT INTO ledger (ledger_category, ledger_type, ledger_description, ledger_count) VALUES ('${category}', '${type}', '${description}', '${count}');`
  db.query(insertQuery, (err, result) => {
    res.send('success!!!!!!!!!!');
    console.log('result', result);
    console.log('req', req.body);
  })
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});