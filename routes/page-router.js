import express from 'express';
const router = express.Router();

router.get('/index/index.html', (req, res, next) => {
    return res.render('index/index', { title: '首页' });
});

router.get('/index/h5.html', (req, res, next) => {
    return res.render('index/h5', { title: 'h5-春秋山' });
});
router.get('/index/h5-1.html', (req, res, next) => {
    return res.render('index/h5-1', { title: 'h5-大别山' });
});
router.get('/index/h5-2.html', (req, res, next) => {
    return res.render('index/h5-2', { title: 'h5-万佛湖' });
});

router.get('/package/package.html', (req, res, next) => {
    return res.render('package/package', { title: '套餐二级页' });
});

router.get('/product/list.html', (req, res, next) => {
    return res.render('product/list', { title: '产品列表' });
});
router.get('/product/detail.html', (req, res, next) => {
    return res.render('product/detail', { title: '产品详情' });
});

router.get('/profile/profile.html', (req, res, next) => {
    return res.render('profile/profile', { title: '个人中心' });
});

module.exports = router;