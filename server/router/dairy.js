const express = require('express');
const router = express.Router();
//==============================================

const connectDB = require('../config/connectDB.js');
const db = connectDB.init();
connectDB.open(db);
//==============================================

router.get('/',(req,res) => {
  const selectQuery = "select * from dairy"
  db.query(selectQuery, (err, result) => {
    res.send(result);
    // console.log('result', result);
  })
});
//==============================================

router.post('/insert',(req,res) => {
  const title = req.body.title;
  const content = req.body.content;
  const image = req.body.image ? req.body.image : 'NULL';
  const insertQuery = `INSERT INTO dairy (user_no, title, content, image) VALUES (1, '${title}', '${content}', '${image}');`
  db.query(insertQuery, (err, result) => {
    res.send(result);
    // console.log('result', result);
  })
});
//==============================================

router.post('/delete', (req,res) => {
  const id = req.body.id;
  console.log("id",id)
  const deleteQuery = `DELETE FROM dairy WHERE dairy_no=${id}`;
  db.query(deleteQuery, (err, result) => {
    // console.log("deleteQuery",deleteQuery);
    res.send("삭제완료")
  })
});
//==============================================
module.exports = router;