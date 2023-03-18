const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const cors = require('cors');
const bodyParser = require('body-parser');
const {urlencoded} = require('body-parser');
const multer = require('multer');
const {v4:uuid} = require('uuid');
const mime = require("mime-types");
const path = require('path');
//==============================================
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
//==============================================
// const DASHBOARD = require('./router/dashboard.js');  
// app.use('/dashboard',DASHBOARD);

const LEDGER = require('./router/ledger.js');  
app.use('/ledger',LEDGER);

const DAIRY = require('./router/dairy.js');  
app.use('/dairy',DAIRY);

const COMMENTS = require('./router/comments.js');  
app.use('/comments',COMMENTS);

const SCHEDULER = require('./router/scheduler.js');  
app.use('/scheduler',SCHEDULER);

const USERS = require('./router/users.js');  
app.use('/users',USERS);

// 이미지 업로드 ==================================
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './images/dairy');
  },
  filename: (req, file, callback) => {
    callback(null, `${uuid()}.${mime.extension(file.mimetype)}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req,file,callback) => {
    if (["image/jpeg", "image/jpg", "image/png"].includes(file.mimetype))
      callback(null, true);
    else callback(new Error("해당 파일의 형식을 지원하지 않습니다."), false);
  },
  limits : {fileSize : 1024 * 1024 * 5}
});

app.post('/upload', upload.single("file"), (req,res) => {
  res.status(200).json(req.file);
});
// images 폴더 내의 파일들을 외부로 노출 시켜주기 위한 미들웨어
app.use('/images', express.static(path.join(__dirname, "/images")));
//==============================================
app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});