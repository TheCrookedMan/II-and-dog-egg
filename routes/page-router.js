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
router.get('/profile/order.html', (req, res, next) => {
    return res.render('profile/order', { title: '我的订单' });
});
router.get('/profile/balance.html', (req, res, next) => {
    return res.render('profile/balance', { title: '我的余额' });
});
router.get('/profile/coupon.html', (req, res, next) => {
    return res.render('profile/coupon', { title: '我的优惠券' });
});
router.get('/profile/address.html', (req, res, next) => {
    return res.render('profile/address', { title: '我的地址' });
});
router.get('/profile/card.html', (req, res, next) => {
    return res.render('profile/card', { title: '激活礼金卡' });
});
router.get('/profile/activeCard.html', (req, res, next) => {
    return res.render('profile/activeCard', { title: '激活宅配礼品卡' });
});
router.get('/profile/bind.html', (req, res, next) => {
    return res.render('profile/bind', { title: '绑定APP账号' });
});
router.get('/profile/address-edit.html', (req, res, next) => {
    return res.render('profile/address-edit', { title: '编辑地址' });
});
router.get('/profile/order-detail.html', (req, res, next) => {
    return res.render('profile/order-detail', { title: '订单详情' });
});
router.get('/profile/order-paySucess.html', (req, res, next) => {
    return res.render('profile/order-paySucess', { title: '订单付款成功' });
});
router.get('/profile/order-pay.html', (req, res, next) => {
    return res.render('profile/order-pay', { title: '订单支付' });
});

router.get('/basket/basket.html', (req, res, next) => {
    return res.render('basket/basket', { title: '我的菜篮子' });
});
router.get('/basket/productList.html', (req, res, next) => {
    return res.render('basket/productList', { title: '产品列表' });
});
router.get('/basket/invoice.html', (req, res, next) => {
    return res.render('basket/invoice', { title: '发票' });
});
router.get('/basket/yuer.html', (req, res, next) => {
    return res.render('basket/yuer', { title: '余额' });
});
router.get('/basket/order.html', (req, res, next) => {
    return res.render('basket/order', { title: '订单确认' });
});
module.exports = router;