import express from 'express';
const router = express.Router();
import common from './tools/common';
import user from './api/user';
import product from './api/product';
import distribution from './api/distribution';
import cart from './api/cart';

/*
    index 分类模板页
 */
router.get('/template/index/index_category.t', [user.HomeProductList_link], (req, res, next) => {
    let record = common.toRecord(res.data);
    return res.render('../template/index/index_category', {
        data: record['/api/Home/HomeProductList']
    });
});

/*
    首页分类下面的商品
 */
router.get('/template/index/index_productList.t', [product.productList_link], (req, res, next) => {
    let record = common.toRecord(res.data);
    return res.render('../template/index/index_productList', {
        data: record['/api/Product/ProductList']
    });
});

/*
    首页左侧分类模板
 */
router.get('/template/index/index_lett-nav.t', [user.category_link], (req, res, next) => {
    let record = common.toRecord(res.data);
    return res.render('../template/index/index_lett-nav', {
        data: record['/api/user/category']
    });
})

/*
    首页轮播
 */
router.get('/template/index/slide.t', [user.homeslide_link], (req, res, next) => {
    let record = common.toRecord(res.data);
    return res.render('../template/index/slide', {
        data: record['/api/user/homeH5']
    });
})

/*
    首页搜索倾情推荐
 */
router.get('/template/index/keyword.t', [user.homeSearchRecommend_link], (req, res, next) => {
    let record = common.toRecord(res.data);
    return res.render('../template/index/keyword', {
        data: record['/api/user/homeSearchRecommend']
    });
})

/*
    商品列表模板
 */
router.get('/template/product/list_gallery.t', [product.productList_link], (req, res, next) => {
    let record = common.toRecord(res.data);
    return res.render('../template/product/list_gallery', {
        data: record['/api/Product/ProductList']
    });
})

/*
    商品详情模板
 */
router.get('/template/product/detail.t', [product.productDetail_link], (req, res, next) => {
    let record = common.toRecord(res.data);
    return res.render('../template/product/detail', {
        data: record['/api/Product/productDetail']
    });
})

/*
    商品列表分类模板
 */
router.get('/template/product/list_nav.t', [user.category_link], (req, res, next) => {
    let record = common.toRecord(res.data);
    return res.render('../template/product/list_nav', {
        data: record['/api/user/category']
    });
})

/*
    商品搜索模板
 */
router.get('/template/product/search_gallery.t', [product.homeSearch_link], (req, res, next) => {
    let record = common.toRecord(res.data);
    return res.render('../template/product/search_gallery', {
        data: record['/api/Product/homeSearch']
    });
})

/*
    我的购物车
 */
router.get('/template/basket/basket_list.t', [cart.cartFullList_link], (req, res, next) => {
    let record = common.toRecord(res.data);
    return res.render('../template/basket/basket_list', {
        data: record['/api/Cart/CartFullList']
    });
})

/*
    确认订单
 */
router.get('/template/basket/order.t', [user.defaultAddressOrderInfo_link], (req, res, next) => {
    let record = common.toRecord(res.data);
    let orderInfo = record['/api/user/defaultAddressOrderInfo'];
    let receiverInfo = orderInfo['data']['receiverInfo'];
    // receiverInfo.hasReceiver = true;
    // if (typeof(receiverInfo.ProvinceName) == 'object' && JSON.stringify(receiverInfo.ProvinceName) == "null") {
    //     receiverInfo.hasReceiver = false;
    // }
    // console.log("-----------------------------------------------------------------");
    // console.log("receiverInfo:::"+typeof(receiverInfo.ProvinceName));
    // console.log(":::::::::"+JSON.stringify(receiverInfo.ProvinceName));
    // console.log(":::::::::"+receiverInfo.ProvinceName);
    return res.render('../template/basket/order', {
        data: orderInfo,
        receiverInfoObject: receiverInfo
    });
})

/*
    确认订单--获取订单可用优惠券
 */
router.get('/template/basket/coupon.t', [user.validCouponList_link], (req, res, next) => {
    let record = common.toRecord(res.data);
    return res.render('../template/basket/coupon', {
        data: record['/api/user/ValidCouponList']
    });
})


/*
    个人中心----我的收货地址列表
 */
router.get('/template/profile/profile_address.t', [user.receiverList], (req, res, next) => {
    let record = common.toRecord(res.data);
    return res.render('../template/profile/profile_address', {
        data: record['/api/user/receiverList']
    });
});

/*
    个人中心----我的收货地址列表 2
 */
router.get('/template/profile/profile_address2.t', [user.receiverList], (req, res, next) => {
    let record = common.toRecord(res.data);
    return res.render('../template/profile/profile_address2', {
        data: record['/api/user/receiverList']
    });
});

/*
    个人中心----新增收货地址
 */

router.get('/template/profile/profile_addressAdd.t', (req, res, next) => {
    return res.render('../template/profile/profile_addressAdd');
});

/*
    个人中心----编辑收货地址
 */

router.get('/template/profile/profile_addressEdit.t', (req, res, next) => {
    let said = req.query.said;
    let address = req.query.address;
    let mobile = req.query.mobile;
    let isdefault = req.query.isdefault;
    let consignee = req.query.consignee;
    let regionid = req.query.regionid;
    return res.render('../template/profile/profile_addressEdit', { said: said, address: address, mobile: mobile, isdefault: isdefault, consignee: consignee, regionid: regionid });
})

/*
    个人中心----我的优惠券列表
 */
router.get('/template/profile/profile_coupon.t', [user.couponList_link], (req, res, next) => {
    let record = common.toRecord(res.data);
    return res.render('../template/profile/profile_coupon', {
        data: record['/api/user/couponList']
    });
})

/*
    推广中心－－－获取下级销量列表
 */
router.get('/template/sale/salesList.t', [distribution.getSalesByMounth], (req, res, next) => {
    let record = common.toRecord(res.data);
    return res.render('../template/sale/salesList', {
        data: record['/api/Distribution/GetSalesByMounth']
    });
})

/*
    个人中心----我的订单未付款
 */

router.get('/template/profile/order_noPay.t', [user.orderList_link], (req, res, next) => {
    let record = common.toRecord(res.data);
    return res.render('../template/profile/order_noPay', {
        data: record['/api/user/OrderList']
    });
})

/*
    个人中心----我的订单配送中
 */
router.get('/template/profile/order_shiping.t', [user.orderList_link], (req, res, next) => {
    let record = common.toRecord(res.data);
    return res.render('../template/profile/order_shiping', {
        data: record['/api/user/OrderList']
    });
})

/*
    个人中心----我的订单已完成
 */
router.get('/template/profile/order_done.t', [user.orderList_link], (req, res, next) => {
    let record = common.toRecord(res.data);
    return res.render('../template/profile/order_done', {
        data: record['/api/user/OrderList']
    });
})

/*
    个人中心----我的订单已取消
 */
router.get('/template/profile/order_cancel.t', [user.orderList_link], (req, res, next) => {
    let record = common.toRecord(res.data);
    return res.render('../template/profile/order_cancel', {
        data: record['/api/user/OrderList']
    });
})

/*
    个人中心----我的订单详情
 */

router.get('/template/profile/order_detail.t', [user.orderDetailByOSN_link], (req, res, next) => {
    let record = common.toRecord(res.data);
    return res.render('../template/profile/order_detail', {
        data: record['/api/user/orderDetailByOSN']
    });
});

/*
    慈善页面
 */

router.get('/template/cishan/cishan.t', [user.cishan_link], (req, res, next) => {
    let record = common.toRecord(res.data);
    return res.render('../template/cishan/cishan', {
        data: record['/api/Distribution/GetDonationRecordList']
    });
});

/*
    物流信息
 */

router.get('/template/profile/order_status.t', [user.expressDetail_link], (req, res, next) => {
    let record = common.toRecord(res.data);
    return res.render('../template/profile/order_status', {
        data: record['/api/User/expressDetail']
    });
});

/*
    提现记录
 */
router.get('/template/sale/withdraw_record.t', [distribution.commissionDrawList_link], (req, res, next) => {
    let record = common.toRecord(res.data);
    // record['/api/Distribution/CommissionDrawList'].data[0].Record[0].State = "打款失败"
    // record['/api/Distribution/CommissionDrawList'].data[0].Record[0].VerifyTime = "2016-08-22 08:00:00"
    // record['/api/Distribution/CommissionDrawList'].data[0].Record[0].VerifyRemark = "打款失败" 
    return res.render('../template/sale/withdraw_record', {
        data: record['/api/Distribution/CommissionDrawList']
    });
});

module.exports = router;
