import express from 'express';
import wechatAuth from './api/wechat';
import { maxAge } from './constants';
import user from './api/user';
import config from './rest/config';
import distribution from './api/distribution';
import common from './tools/common';
const router = express.Router();


router.get('*.html', (req, res, next) => {
    let shareParentId = req.query.shareParentId;
    if (shareParentId != undefined && shareParentId != 0) {
        res.cookie('shareParentId', shareParentId, { maxAge: maxAge, path: '/' });
    }
    next();
});


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

                        user.getUserInfo(openid, function(data) {
                            if ("1" == data.code) {
                                let userinfoRecord = data.data;
                                console.log("userinfo:::" + JSON.stringify(userinfoRecord));
                                userinfoRecord = JSON.stringify(userinfoRecord);
                                res.cookie('userinfo', userinfoRecord, { maxAge: maxAge, path: '/' });
                            } else {
                                console.log("userinfo:::{}");
                                res.cookie('userinfo', "{}", { maxAge: maxAge, path: '/' });
                            }
                            res.redirect(redirect_uri);
                        }, next);
                        // res.redirect(redirect_uri);
                    }
                });
            } else if ("snsapi_base" == data.scope) {
                user.getUserInfo(openid, function(data) {

                    console.log("data:::" + JSON.stringify(data));
                    if ("1" == data.code) {
                        let userinfoRecord = data.data;
                        userinfoRecord = JSON.stringify(userinfoRecord);
                        res.cookie('userinfo', userinfoRecord, { maxAge: maxAge, path: '/' });
                    } else {
                        res.cookie('userinfo', "{}", { maxAge: maxAge, path: '/' });
                    }
                    res.redirect(redirect_uri);
                }, next);
            }
        } else {
            //error
            next({
                msg: "微信授权失败，请返回上级页面重新打开！"
            });
            console.log("==========wechatAuth===========微信授权失败！" + params);
        }
    }, function(err) {
        //error
        next({
            msg: "微信授权失败，请返回上级页面重新打开！"
        });
        console.log("============wechatAuth=========微信授权失败！accessToken errorCallback::" + err);
    });
});

/*
    根据二丫的规则获取对应的商品ID
 */
// router.get('/pid/*', (req, res, next) => {
//     let url = req.url;
//     let pid = url.replace('/pid/', '').replace('.html', '');
//     return res.render('product/detail', { title: '产品详情', pid: pid });
// });
// router.get('/tc/*', (req, res, next) => {
//     let url = req.url;
//     let pid = url.replace('/pid/', '').replace('.html', '');
//     return res.render('product/detail', { title: '产品详情', pid: pid });
// });

/*
    首页
 */

router.get('/index/index.html', [user.HomeProductList_link, user.homeslide_link], (req, res, next) => {
    let record = common.toRecord(res.data);
    return res.render('index/index', {
        title: '首页',
        data: record['/api/Home/HomeProductList'],
        homeslide: record['/api/Home/homeH5']
    });
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
    套餐二级页详情页
 */

router.get('/package/info.html', (req, res, next) => {
    return res.render('package/info', { title: '宅配卡介绍' });
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
    let pid = req.query.pid;
    return res.render('product/detail', { title: '产品详情', pid: pid });
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

router.get('/profile/order.html', [user.checkLogin], (req, res, next) => {
    return res.render('profile/order', { title: '我的订单' });
});

/*
    我的余额
 */

router.get('/profile/balance.html', [user.checkLogin], (req, res, next) => {
    return res.render('profile/balance', { title: '我的余额' });
});

/*
    我的优惠券
 */

router.get('/profile/coupon.html', [user.checkLogin], (req, res, next) => {
    return res.render('profile/coupon', { title: '我的优惠券' });
});

/*
    我的地址
 */

router.get('/profile/address.html', [user.checkLogin], (req, res, next) => {
    return res.render('profile/address', { title: '我的地址' });
});

/*
    激活礼金卡
 */

router.get('/profile/card.html', [user.checkLogin], (req, res, next) => {
    return res.render('profile/card', { title: '激活礼金卡' });
});

/*
    激活宅配礼品卡
 */

router.get('/profile/activate.html', [user.checkLogin], (req, res, next) => {
    return res.render('profile/activate', { title: '激活宅配礼品卡' });
});

/*
    激活宅配礼品卡-填写信息
 */

router.get('/profile/activate-info.html', [user.checkLogin], (req, res, next) => {
    return res.render('profile/activate-info', { title: '填写信息' });
});

/*
    激活宅配礼品卡-填写信息
 */

router.get('/profile/activate-age.html', [user.checkLogin], (req, res, next) => {
    return res.render('profile/activate-age', { title: '填写信息' });
});

/*
    激活宅配礼品卡-填写信息
 */

router.get('/profile/activate-other.html', [user.checkLogin], (req, res, next) => {
    return res.render('profile/activate-other', { title: '填写信息' });
});


/*
    激活宅配礼品卡-成功页面
 */

router.get('/profile/activate-success.html', [user.checkLogin], (req, res, next) => {
    return res.render('profile/activate-success', { title: '激活成功' });
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
    let address = req.query.address;
    let mobile = req.query.mobile;
    let isdefault = req.query.isdefault;
    let consignee = req.query.consignee;
    let regionid = req.query.regionid;
    return res.render('profile/address-edit', { title: '编辑地址', said: said, address: address, mobile: mobile, isdefault: isdefault, consignee: consignee, regionid: regionid });
});

/*
    订单详情
 */

router.get('/profile/order-detail.html', (req, res, next) => {
    let OSN = req.query.OSN;
    let orderId = req.query.orderId;
    return res.render('profile/order-detail', { title: '订单详情', OSN: OSN, orderId: orderId });
});

/*
    订单付款成功
 */

router.get('/profile/order-paySucess.html', (req, res, next) => {
    let userMobile = req.query.userMobile,
        username = req.query.username,
        addressInfo = req.query.addressInfo,
        OSN = req.query.OSN,
        orderId = req.query.orderId,
        TotalPrice = req.query.TotalPrice;
    return res.render('profile/order-paySucess', { title: '订单付款成功', userMobile: userMobile, username: username, addressInfo: addressInfo, OSN: OSN, orderId: orderId, TotalPrice: TotalPrice });
});

/*
    订单支付
 */

router.get('/profile/order-pay.html', (req, res, next) => {
    let osn = req.query.osn,
        orderAmount = req.query.orderAmount,
        TotalAmount = req.query.TotalAmount,
        CouponMoney = req.query.CouponMoney,
        userMobile = req.query.userMobile,
        username = req.query.username,
        addressInfo = req.query.addressInfo,
        OSN = req.query.osn,
        orderId = req.query.orderId,
        TotalPrice = req.query.TotalPrice;

    if (!!orderAmount) {
        orderAmount *= 1;
    }
    if (!!TotalAmount) {
        TotalAmount *= 1;
    }
    if (!!CouponMoney) {
        CouponMoney *= 1;
    }
    return res.render('profile/order-pay', { title: '订单支付', osn: osn, orderAmount: orderAmount, TotalAmount: TotalAmount, CouponMoney: CouponMoney, userMobile: userMobile, username: username, addressInfo: addressInfo, OSN: OSN, orderId: orderId, TotalPrice: TotalPrice });
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
    用户注册
 */
router.get('/profile/register.html', (req, res, next) => {
    let ParentID = req.query.ParentID;
    return res.render('profile/register', { title: '用户注册', ParentID: ParentID });
})

/*
    我的菜篮子
 */

router.get('/basket/basket.html', [user.checkLogin], (req, res, next) => {
    return res.render('basket/basket', { title: '我的菜篮子' });
});

/*
    产品列表
 */

router.get('/basket/productList.html', [user.defaultAddressOrderInfo_link], (req, res, next) => {
    let record = common.toRecord(res.data);
    return res.render('basket/productList', {
        title: '产品列表',
        data: record['/api/user/defaultAddressOrderInfo']
    });
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
    let pids = req.query.pids;
    return res.render('basket/order', { title: '订单确认', pids: pids });
});

/*
    健康推广大使
 */

router.get('/sale/index.html', (req, res, next) => {
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
    let userinfo = req.cookies.userinfo,
        Uid = 0;
    if (!!userinfo) {
        userinfo = JSON.parse(userinfo);
        Uid = userinfo.Uid
    }

    return res.render('sale/team', { title: '我的团队', Uid: Uid });
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

router.get('/sale/team-detail.html', [distribution.getLowerLevelDetail], (req, res, next) => {
    let record = common.toRecord(res.data);
    return res.render('sale/team-detail', { title: '会员列表', data: record['/api/Distribution/GetLowerLevelDetail'] });
});

/*
    我的二维码
 */

router.get('/sale/code.html', (req, res, next) => {
    let shareParentId = req.query.shareParentId;
    return res.render('sale/code', { title: '我的二维码', shareParentId: shareParentId });
});

/*
    选择提现方式页面
 */
router.get('/sale/request-withdraw.html', (req, res, next) => {
    return res.render('sale/request-withdraw', { title: '申请提现' });
});

/*
    提现至支付宝
 */

router.get('/sale/withdraw-alipay.html', (req, res, next) => {
    return res.render('sale/withdraw-alipay', { title: '提现至支付宝' });
});

/*
    申请提现页面
 */
router.get('/sale/withdraw-alipay-2.html', (req, res, next) => {
    return res.render('sale/withdraw-alipay-2', { title: '申请提现' });
})

/*
    推广设置主页（提现密码相关）
 */
router.get('/sale/setting/main.html', (req, res, next) => {
    let userinfo = req.cookies.userinfo;
    userinfo = JSON.parse(userinfo);

    if (!!userinfo && userinfo.IsSetSecurityCode) {
        return res.render('sale/setting/main', { title: '设置' });

    } else {
        return res.redirect("/sale/setting/checkPhoneNumber.html");
    }
});

/*
    修改提现密码-1
 */
router.get('/sale/setting/updatePassword-1.html', (req, res, next) => {
    return res.render('sale/setting/updatePassword-1', { title: '修改提现密码' });
});

/*
    修改提现密码-2
 */
router.get('/sale/setting/updatePassword-2.html', (req, res, next) => {
    return res.render('sale/setting/updatePassword-2', { title: '设置提现密码' });
});

/*
    修改提现密码-3
 */
router.get('/sale/setting/updatePassword-3.html', (req, res, next) => {
    let password = req.query.password;
    return res.render('sale/setting/updatePassword-3', { title: '设置提现密码', password: password });
});

/*
    验证手机号
 */
router.get('/sale/setting/checkPhoneNumber.html', (req, res, next) => {
    return res.render('sale/setting/checkPhoneNumber', { title: '设置提现密码' });
});

/*
    慈善
 */

router.get('/cishan/cishan.html', (req, res, next) => {
    return res.render('cishan/cishan', { title: '慈善' });
});

/*
    物流
 */

router.get('/profile/order-status.html', (req, res, next) => {
    let OSN = req.query.OSN;
    let orderId = req.query.orderId;
    return res.render('profile/order-status', { title: '物流信息', OSN: OSN, orderId: orderId });
});

/*
    宅配页面
 */
router.get('/home-delivery/index.html', (req, res, next) => {
    return res.render('home-delivery/index', { title: '宅配' });
});

router.get('*.html', (req, res, next) => {
    res.redirect('/index/index.html');
});

module.exports = router;
