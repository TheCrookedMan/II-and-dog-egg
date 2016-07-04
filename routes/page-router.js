import express from 'express';
import wechatAuth from './api/wechat';
import { maxAge } from './constants';
const router = express.Router();

router.get('/wechatAuth.html', (req, res, next) => {
    let options = req.query,
        redirect_uri = options.state;
    let list = [];

    wechatAuth.accessToken(options.code, function(params) {
        let data = JSON.parse(params);
        //没有errcode字段表示请求成功
        if (!data.errcode) {
            if ("snsapi_userinfo" == data.scope) {
                let access_token = data.access_token,
                    openid = data.openid;

                res.cookie('openId', openid, { maxAge: maxAge, path: '/' });
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
                        res.cookie('wechatUserInfo', userinfo, { maxAge: maxAge, path: '/' });
                        res.redirect("/index/index.html");
                    }
                });
            } else if ("snsapi_base" == data.scope) {}
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

router.get('*', (req, res, next) => {
    return res.render('index', { title: '首页' });
});

module.exports = router;