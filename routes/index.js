const express = require('express');
const router = express.Router();
const path = require('path');
const bdps = require('body-parser');


router.use(bdps.urlencoded({extended:true}));
router.use(bdps.json());

// 로그인 페이지
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "Log in.html"));
});

// 회원가입 페이지
router.get('/Sign in', (req, res) =>
    res.sendFile(path.join(__dirname, "..", 'views', 'Sign in.html'))
);

// 게시글 목록 페이지
router.get('Main', (req, res) =>
    res.sendFile(path.join(__dirname, "..", 'views', 'Main.html'))
);

// 게시글 작성 페이지
router.get('make post', (req, res) =>
    res.sendFile(path.join(__dirname, "..", 'views', 'make post.html'))
);

// 게시글 수정 페이지
router.get('edit post', (req, res) =>
    res.sendFile(path.join(__dirname, "..", 'views', 'edit post.html'))
);

// 프로필 수정 페이지
router.get('edit profile', (req, res) =>
    res.sendFile(path.join(__dirname, "..", 'views', 'edit profile.html'))
);

// 비밀번호 수정 페이지
router.get('edit password', (req, res) =>
    res.sendFile(path.join(__dirname, "..", 'views', 'edit password.html'))
);


module.exports = router;