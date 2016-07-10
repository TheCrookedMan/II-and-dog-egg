import express from 'express';
const router = express.Router();
import common from './tools/common';
import user from './api/user';
import product from './api/product';
import cart from './api/cart';

/*
	index 分类模板页
 */
router.get('/template/index/index_category.t', [user.category_link], function(req, res, next) {
    let record = common.toRecord(res.data);
    return res.render('../template/index/index_category', {
        data: record['/api/user/category']
    });
});

/*
	首页左侧分类模板
 */
router.get('/template/index/index_lett-nav.t', [user.category_link], function(req, res, next) {
    let record = common.toRecord(res.data);
    return res.render('../template/index/index_lett-nav', {
        data: record['/api/user/category']
    });
})

/*
	商品列表模板
 */
router.get('/template/product/list_gallery.t', [product.productList_link], function(req, res, next) {
    let record = common.toRecord(res.data);
    return res.render('../template/product/list_gallery', {
        data: record['/api/Product/ProductList']
    });
})

/*
    商品详情模板
 */
router.get('/template/product/detail.t', [product.productDetail_link], function(req, res, next) {
    let record = common.toRecord(res.data);
    return res.render('../template/product/detail', {
        data: record['/api/Product/productDetail']
    });
})

/*
    商品列表分类模板
 */
router.get('/template/product/list_nav.t', [user.category_link], function(req, res, next) {
    let record = common.toRecord(res.data);
    return res.render('../template/product/list_nav', {
        data: record['/api/user/category']
    });
})

/*
    商品搜索模板
 */
router.get('/template/product/search_gallery.t', [product.homeSearch_link], function(req, res, next) {
    let record = common.toRecord(res.data);
    return res.render('../template/product/search_gallery', {
        data: record['/api/Product/homeSearch']
    });
})

/*
    我的购物车
 */
router.get('/template/basket/basket_list.t', [cart.cartFullList_link], function(req, res, next) {
    let record = common.toRecord(res.data);
    return res.render('../template/basket/basket_list', {
        data: record['/api/Cart/CartFullList']
    });
})


/*
    个人中心----我的收货地址列表
 */
router.get('/template/profile/profile_address.t', [user.receiverList], function(req, res, next) {
    let record = common.toRecord(res.data);
    return res.render('../template/profile/profile_address', {
        data: record['/api/user/receiverList']
    });
})

/*
    个人中心----编辑收货地址
 */
router.get('/template/profile/profile_addressEdit.t', [user.editReceiver], function(req, res, next) {
    let record = common.toRecord(res.data);
    return res.render('../template/profile/profile_addressEdit', {
        data: record['/api/user/editReceiver']
    });
})

/*
    个人中心----我的优惠券列表
 */
router.get('/template/profile/profile_coupon.t', [user.couponList_link], function(req, res, next) {
    let record = common.toRecord(res.data);
    return res.render('../template/profile/profile_coupon', {
        data: record['/api/user/couponList']
    });
})

/*
    个人中心----我的订单未付款
 */
router.get('/template/profile/order_noPay.t', [user.orderList_link], function(req, res, next) {
    let record = common.toRecord(res.data);
    return res.render('../template/profile/order_noPay', {
        data: record['/api/user/OrderList']
    });
})

/*
    个人中心----我的订单配送中
 */
router.get('/template/profile/order_shiping.t', [user.orderList_link], function(req, res, next) {
    let record = common.toRecord(res.data);
    return res.render('../template/profile/order_shiping', {
        data: record['/api/user/OrderList']
    });
})

/*
    个人中心----我的订单已完成
 */
router.get('/template/profile/order_done.t', [user.orderList_link], function(req, res, next) {
    let record = common.toRecord(res.data);
    return res.render('../template/profile/order_done', {
        data: record['/api/user/OrderList']
    });
})

/*
    个人中心----我的订单已取消
 */
router.get('/template/profile/order_cancel.t', [user.orderList_link], function(req, res, next) {
    let record = common.toRecord(res.data);
    return res.render('../template/profile/order_cancel', {
        data: record['/api/user/OrderList']
    });
})

/*
    个人中心----我的订单详情
 */
router.get('/template/profile/order_detail.t', [user.orderDetailByOSN_link], function(req, res, next) {
    let record = common.toRecord(res.data);
    return res.render('../template/profile/order_detail', {
        data: record['/api/user/orderDetailByOSN']
    });
})
module.exports = router;
