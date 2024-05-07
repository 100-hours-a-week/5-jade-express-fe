const express = require('express');
require('dotenv').config();
const path = require('path');
const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

// 정적 파일 설정
app.use(express.static(path.join(__dirname, "public")));

// 라우터 모듈 연결
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  });