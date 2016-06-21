import express from 'express';
const router = express.Router();

router.get('/index/index.html', (req, res, next) => {
    return res.render('index/index', { title: '首页' });
});

module.exports = router;