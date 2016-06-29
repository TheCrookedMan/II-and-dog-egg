import express from 'express';
const router = express.Router();

router.get('/index/index.html', (req, res, next) => {
    return res.render('index/index', { title: '首页' });
});

router.get('/package/package.html', (req, res, next) => {
    return res.render('package/package', { title: '套餐二级页' });
});

router.get('*', (req, res, next) => {
    return res.render('index', { title: '首页' });
});

module.exports = router;