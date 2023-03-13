const express = require('express');
const router = express.Router();
//==============================================

const connectDB = require('../config/connectDB.js');
const db = connectDB.init();
connectDB.open(db);
//==============================================

router.post('/',(req,res) => {
  const dairy_no = req.body.dairy_no;
  const selectQuery = `SELECT * FROM comments LEFT JOIN users on comments.user_no=users.user_no WHERE comments.user_no=1 AND comments.dairy_no=${dairy_no};`;
  const countQuery = `SELECT COUNT(*) as cnt FROM comments WHERE dairy_no=${dairy_no};`
  db.query(selectQuery + countQuery, (err, result) => {
    if(err) console.log("err",err);
    else{
      // console.log("dairy_no",dairy_no);
      res.send(result);
      // console.log('result', result);
    }
  })
});
//==============================================
router.post('/insert', (req,res) => {
  const dairy_no = req.body.dairy_no;
  const comment = req.body.comment;
  const insertQuery = `INSERT INTO comments (dairy_no, user_no, comment) VALUES ('${dairy_no}', '1', '${comment}');`
  db.query(insertQuery, (err,result) => {
    if(err) console.log("err",err);
    else {
      // console.log("dairy_no",dairy_no);
      res.send(result);
      // console.log('result', result);
    }
  })
})
//==============================================

router.post('/delete',(req,res)=>{
  const comment_no = req.body.comment_no;
  const deleteQuery = `DELETE FROM comments WHERE comment_no=${comment_no};`
  db.query(deleteQuery, (err,result)=>{
    if(err) console.log("err",err);
    else{
      console.log("comment_no",comment_no);
      res.send(result);
      console.log('result',result);
    }
  })
})
//==============================================
module.exports = router;