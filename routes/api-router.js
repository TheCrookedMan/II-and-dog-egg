import express from 'express';
const router = express.Router();
import cart from './api/cart';
import distribution from './api/distribution';
import product from './api/product';
import smsCode from './api/smsCode';
import user from './api/user';
import wechat from './api/wechat';
import log from './api/log';
let logger = new log();
/*
	user 用户相关请求
 */

// 登录
router.post('/user/login.post', user.login);

// 注册
router.post('/user/register.post', user.register);

// 修改/新增/删除收货人地址
router.post('/user/editReceiver.post', user.editReceiver);

// 收货地址列表
router.post('/user/receiverList.post', user.receiverList);

// 分类
router.post('/user/category.post', user.category);

// 修改头像
router.post('/user/editAvatar.post', user.editAvatar);

// 修改密码
router.post('/user/editPwd.post', user.editPwd);

// 修改个人资料
router.post('/user/editUserInfo.post', user.editUserInfo);

// 获取用户基本信息
router.post('/user/getUserInfo.post', user.getUserInfo_Post);

// 留言反馈
router.post('/user/feedback.post', user.feedback);

// 确认订单
router.post('/user/defaultAddressOrderInfo.post', user.defaultAddressOrderInfo);

// 提交订单
router.post('/user/submitOrder.post', user.submitOrder);

// 优惠券列表
router.post('/user/couponList.post', user.couponList);

// 获取订单可用优惠券
router.post('/user/validCouponList.post', user.validCouponList);

// 取消订单
router.post('/user/cancelOrder.post', user.cancelOrder);

// 确认收货
router.post('/user/takeDelivery.post', user.takeDelivery);

// 个人中心订单列表
router.post('/user/orderList.post', user.orderList);

// 订单详情
router.post('/user/orderDetailByOSN.post', user.orderDetailByOSN);

// 修改地址后获取运费
router.post('/user/modifyAddressOrderInfo.post', user.modifyAddressOrderInfo);

// 申请退款
router.post('/user/applyRefund.post', user.applyRefund);

// 订单提示信息
router.post('/user/GetPromptFlg.post', user.GetPromptFlg);

// 获取用户支付商品信息
router.post('/user/GetOrderProdInfo.post',user.GetOrderProdInfo);

/*
	发送验证码，此接口只是提供于 设置 提现安全码  功能
 */

router.post('/user/SendSmscode.post', user.SendSmscode);

//wechat
router.post('/wechat/getJSApiTicket', wechat.getJSApiTicket);

/*
	验证验证码
 */

router.post('/user/CheckSmsCode.post', user.CheckSmsCode);

/*
	支付
 */

router.post('/user/eycharges.post', user.eycharges);

/*
	激活礼金卡
 */
router.post('/user/checkCard.post', user.checkCard);

router.post('/user/modifyAddressOrderInfo.post',user.modifyAddressOrderInfo);

/*
	cart 购物车相关请求
 */

// 添加购物车
router.post('/cart/addProdToCart.post', cart.addProdToCart);

// 根据uId获取购物车信息
router.post('/cart/cartFullList.post', cart.cartFullList);

// 编辑购物车
router.post('/cart/editCart.post', cart.editCart);

// 购物车删除
router.post('/cart/delForCart.post', cart.delForCart);

/*
	distribution 相关请求
 */
// 本月任务完成百分比接口
router.post('/distribution/monthTask.post', distribution.monthTask);

// 我的推广费/可提现金额
router.post('/distribution/commitionMoney.post', distribution.commitionMoney);

// 推广费首页接口
router.post('/distribution/getIncome.post', distribution.getIncome);

// 支付宝提现申请接口
router.post('/distribution/withdrawalApply.post', distribution.withdrawalApply);

// 设置（更新）提现安全码
router.post('/distribution/setSecurityCode.post', distribution.setSecurityCode);

// 提现记录
router.post('/distribution/commissionDrawList.post', distribution.commissionDrawList);

// 三级推广团队的团队人数汇总接口
router.post('/distribution/getLowerLevelCount.post', distribution.getLowerLevelCount);

// 各级人数详情列表
router.post('/distribution/getLowerLevelDetail.post', distribution.getLowerLevelDetail);

// 下级销量统计
router.post('/distribution/getSalesCount.post', distribution.getSalesCount);

// 下级每月销量统计
router.post('/distribution/getSalesByMounth.post', distribution.getSalesByMounth);

// 验证安全码是否正确
router.post('/distribution/checkSetSecurityCode.post', distribution.checkSetSecurityCode);

// 绑定已有app账号
router.post('/distribution/appBind.post', distribution.appBind);

/*
	product 相关请求 
 */

// 产品列表
router.post('/product/productList.post', product.productList);

// 商品详情页
router.post('/product/productDetail.post', product.productDetail);

// 搜索
router.post('/product/homeSearch.post', product.homeSearch);


/*
	smsCode 相关请求
 */
// 注册手机获取验证码接口
router.post('/smsCode/register_smscode.post', smsCode.register_smscode);


// 慈善
router.post('/user/cishan.post', user.cishan);

// 首页轮播
router.post('/Home/homeslide.post', user.homeslide);

// 搜索关键字推荐
router.post('/Home/homeSearchRecommend.post', user.homeSearchRecommend);

// 我的余额
router.post('/user/accountBalance.post', user.accountBalance);

// 物流信息
router.post('/user/expressDetail.post', user.expressDetail);

// 购物车数量
router.post('/cart/GetCartCount.post', cart.GetCartCount);

router.post('/log/write.post',logger.write);

module.exports = router;
