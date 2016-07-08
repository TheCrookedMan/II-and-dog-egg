import express from 'express';
const router = express.Router();
import common from './tools/common';
import user from './api/user';
import product from './api/product';

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
module.exports = router;
