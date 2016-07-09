import express from 'express';
import wechatAuth from './api/wechat';
import { maxAge } from './constants';
import user from './api/user';
import config from './rest/config';
import distribution from './api/distribution';
const router = express.Router();

router.get('/wechatAuth.html', (req, res, next) => {
    let options = req.query,
        redirect_uri = options.state;
    let list = [];

    wechatAuth.accessToken(config.wechat.appId, config.wechat.appsecret, options.code, function(params) {
        let data = JSON.parse(params);
        //没有errcode字段表示请求成功
        if (!data.errcode) {
            let access_token = data.access_token,
                openid = data.openid;

            console.log("openid:::" + openid);
            res.cookie('openId', openid, { maxAge: maxAge, path: '/' });
            if ("snsapi_userinfo" == data.scope) {
                wechatAuth.getUserInfo(access_token, openid, function(userinfo) {
                    let info = JSON.parse(userinfo);
                    if (!info.openid) {
                        /*
                            获取微信用户信息失败
                         */
                        next({
                            msg: "微信授权获取用户信息失败！"
                        });
                    } else {
                        /*
                            返回的userinfo信息里面有openid证明请求返回成功
                         */
                        console.log("wechatUserInfo:::" + userinfo);
                        res.cookie('wechatUserInfo', userinfo, { maxAge: maxAge, path: '/' });
                        res.redirect(redirect_uri);
                    }
                });
            } else if ("snsapi_base" == data.scope) {
                user.getUserInfo(openid, function(data) {
                    console.log("data:::" + JSON.stringify(data));
                    res.redirect(redirect_uri);
                }, next);
            }
        } else {
            //error
            next({
                msg: "微信授权失败！"
            });
        }
    }, function(err) {
        //error
        next({
            msg: "微信授权失败！"
        });
    });
});

/*
    首页
 */

router.get('/index/index.html', (req, res, next) => {
    return res.render('index/index', { title: '首页' });
});

/*
    h5-春秋山
 */

router.get('/index/h5.html', (req, res, next) => {
    return res.render('index/h5', { title: 'h5-春秋山' });
});

/*
    h5-大别山
 */

router.get('/index/h5-1.html', (req, res, next) => {
    return res.render('index/h5-1', { title: 'h5-大别山' });
});

/*
    h5-万佛湖
 */

router.get('/index/h5-2.html', (req, res, next) => {
    return res.render('index/h5-2', { title: 'h5-万佛湖' });
});

/*
    套餐二级页
 */

router.get('/package/package.html', (req, res, next) => {
    return res.render('package/package', { title: '套餐二级页' });
});

/*
    产品列表
 */

router.get('/product/list.html', (req, res, next) => {
    let categoryId = req.query.categoryId;
    return res.render('product/list', { title: '产品列表', categoryId: categoryId });
});

/*
    产品详情
 */

router.get('/product/detail.html', (req, res, next) => {
    return res.render('product/detail', { title: '产品详情' });
});

/*
    产品搜索
 */

router.get('/product/search.html', (req, res, next) => {
    let searchkey = req.query.searchkey;
    return res.render('product/search', { title: '产品搜索', searchkey: searchkey });
});

/*
    个人中心
 */

router.get('/profile/profile.html', (req, res, next) => {
    return res.render('profile/profile', { title: '个人中心' });
});

/*
    我的订单
 */

router.get('/profile/order.html', (req, res, next) => {
    return res.render('profile/order', { title: '我的订单' });
});

/*
    我的余额
 */

router.get('/profile/balance.html', (req, res, next) => {
    return res.render('profile/balance', { title: '我的余额' });
});

/*
    我的优惠券
 */

router.get('/profile/coupon.html', (req, res, next) => {
    return res.render('profile/coupon', { title: '我的优惠券' });
});

/*
    我的地址
 */

router.get('/profile/address.html', (req, res, next) => {
    return res.render('profile/address', { title: '我的地址' });
});

/*
    激活礼金卡
 */

router.get('/profile/card.html', (req, res, next) => {
    return res.render('profile/card', { title: '激活礼金卡' });
});

/*
    激活宅配礼品卡
 */

router.get('/profile/activeCard.html', (req, res, next) => {
    return res.render('profile/activeCard', { title: '激活宅配礼品卡' });
});

/*
    绑定APP账号
 */

router.get('/profile/bind.html', (req, res, next) => {
    return res.render('profile/bind', { title: '绑定APP账号' });
});

/*
    新增地址
 */

router.get('/profile/address-add.html', (req, res, next) => {
    return res.render('profile/address-add', { title: '新增地址' });
});

/*
    编辑地址
 */

router.get('/profile/address-edit.html', (req, res, next) => {
    let said = req.query.said;
    return res.render('profile/address-edit', { title: '编辑地址' });
});

/*
    订单详情
 */

router.get('/profile/order-detail.html', (req, res, next) => {
    return res.render('profile/order-detail', { title: '订单详情' });
});

/*
    订单付款成功
 */

router.get('/profile/order-paySucess.html', (req, res, next) => {
    return res.render('profile/order-paySucess', { title: '订单付款成功' });
});

/*
    订单支付
 */

router.get('/profile/order-pay.html', (req, res, next) => {
    return res.render('profile/order-pay', { title: '订单支付' });
});

/*
    设置
 */

router.get('/profile/set.html', (req, res, next) => {
    return res.render('profile/set', { title: '设置' });
});

/*
    关于我们
 */

router.get('/profile/about.html', (req, res, next) => {
    return res.render('profile/about', { title: '关于我们' });
});

/*
    使用帮助
 */

router.get('/profile/help.html', (req, res, next) => {
    return res.render('profile/help', { title: '使用帮助' });
});

/*
    如何推广
 */

router.get('/profile/how_1.html', (req, res, next) => {
    return res.render('profile/how_1', { title: '如何推广' });
});

/*
    如何成为推广大使
 */

router.get('/profile/how_2.html', (req, res, next) => {
    return res.render('profile/how_2', { title: '如何成为推广大使' });
});

/*
    如何恢复身份
 */

router.get('/profile/how_3.html', (req, res, next) => {
    return res.render('profile/how_3', { title: '如何恢复身份' });
});

/*
    优惠券使用规则
 */

router.get('/profile/help-coupon.html', (req, res, next) => {
    return res.render('profile/help-coupon', { title: '优惠券使用规则' });
});

/*
    配送说明
 */

router.get('/profile/help-ship.html', (req, res, next) => {
    return res.render('profile/help-ship', { title: '配送说明' });
});

/*
    发票制度
 */

router.get('/profile/help-invoice.html', (req, res, next) => {
    return res.render('profile/help-invoice', { title: '发票制度' });
});

/*
    退货政策
 */


router.get('/profile/help-goods.html', (req, res, next) => {
    return res.render('profile/help-goods', { title: '退货政策' });
});

/*
    我的菜篮子
 */

router.get('/basket/basket.html', (req, res, next) => {
    return res.render('basket/basket', { title: '我的菜篮子' });
});

/*
    产品列表
 */

router.get('/basket/productList.html', (req, res, next) => {
    return res.render('basket/productList', { title: '产品列表' });
});

/*
    发票
 */

router.get('/basket/invoice.html', (req, res, next) => {
    return res.render('basket/invoice', { title: '发票' });
});

/*
    余额
 */

router.get('/basket/yuer.html', (req, res, next) => {
    return res.render('basket/yuer', { title: '余额' });
});

/*
    订单确认
 */

router.get('/basket/order.html', (req, res, next) => {
    return res.render('basket/order', { title: '订单确认' });
});

/*
    健康推广大使
 */

router.get('/sale/index.html',(req, res, next) => {
    return res.render('sale/index', { title: '健康推广大使' });
});

/*
    我的推广费
 */

router.get('/sale/price.html', (req, res, next) => {
    return res.render('sale/price', { title: '我的推广费' });
});

/*
    我的团队
 */

router.get('/sale/team.html', (req, res, next) => {
    return res.render('sale/team', { title: '我的团队' });
});

/*
    我的销量
 */

router.get('/sale/sale.html', (req, res, next) => {
    return res.render('sale/sale', { title: '我的销量' });
});

/*
    会员列表
 */

router.get('/sale/team-detail.html', (req, res, next) => {
    return res.render('sale/team-detail', { title: '会员列表' });
});

/*
    我的二维码
 */

router.get('/sale/code.html', (req, res, next) => {
    return res.render('sale/code', { title: '我的二维码' });
});


/*
    慈善
 */

router.get('/cishan/cishan.html', (req, res, next) => {
    return res.render('cishan/cishan', { title: '慈善' });
});

router.get('*', (req, res, next) => {
    res.redirect('/index/index.html');
});


module.exports = router;
