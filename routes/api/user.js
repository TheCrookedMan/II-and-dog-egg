import normalRequest from '../rest/normalRequest';
import config from '../rest/config';
let distributionPost = config.wechat.distributionPost;
/*
    登录 api/user/register
    入参
    {
		 "account": "13800001111",
		 "password": "e10adc3949ba59abbe56e057f20f883e"
		}
 */
exports.login = (req, res, next) => { new normalRequest('/api/user/login').post(req, res, next); }

/*
		注册 api/user/register
		入参
		username   账户Uid   不可为空

		userpwd   安全码   不可为空

		verifycode   手机验证码   不可为空

		OpenID    OpenID    不可为空

		UserIdentity   身份    可为空

		ParentID   父级ID   可为空   注册时传0，扫码注册时传入二维码所属的用户ID
		
		wImage   微信图像   可为空

		wName   微信昵称   可为空

 */

exports.register = (req, res, next) => { new normalRequest('/api/user/register', { post: distributionPost }).post(req, res, next); }

/*
		修改/新增/删除收货人地址（api/user/editReceiver）
		入参
		{
		   "address": "清峪路XXX",
		   "mobile": "186xxxxx",
		   "regionid": 148,
		   "uid": 380,
		   "isdefault": 1,
		   "consignee": "XXXX",
		   "edittag": 0,    //0表示新增  1表示更新  -1表示删除
		   "said": "0"
		}

 */
exports.editReceiver = (req, res, next) => { new normalRequest('/api/user/editReceiver').post(req, res, next); }

/*
		收货地址列表（api/user/receiverList）
		入参
		{"uid": 380}
 */
exports.receiverList = (req, res, next) => { new normalRequest('/api/user/receiverList').link(req, res, next); }


/*
		分类（api/user/category）
		入参：无
 */
exports.category = (req, res, next) => { new normalRequest('/api/user/category').post(req, res, next); }

exports.category_link = (req, res, next) => { new normalRequest('/api/user/category').link_g(req, res, next); }

/*
		修改头像（api/user/editAvatar）
		入参：
		{
		 "uid": 9,
		 "img": "/upload/service//20160620/636020188313664086c4b60.png"
		}
 */
exports.editAvatar = (req, res, next) => { new normalRequest('/api/user/editAvatar').post(req, res, next); }

/*
		修改密码 (api/user/editPwd)
		入参：
		{
			"uid": 9,
			"opwd": "687d1b5d9e91b9e057dff4f89e248927",
			"npwd": "e10adc3949ba59abbe56e057f20f883e"
		}
 */
exports.editPwd = (req, res, next) => { new normalRequest('/api/user/editPwd').post(req, res, next); }

/*
	修改个人资料(api/user/editUserInfo)
	入参：
	{
		 "uid": 9,
		 "nickname": "小样，当归不归额",
		 "birthday": "2016/06/19",
		 "gender": 2   1表示男  2表示女
	}
*/
exports.editUserInfo = (req, res, next) => { new normalRequest('/api/user/editUserInfo').post(req, res, next); }

/*
	获取用户基本信息(api/user/GetUserInfo)
	入参：
	{
		 "Uid": 9, *选填
		 "OpenID": "xxxxxxxxxxxx", *选填
	}
	说明：Uid和OpenID可选一个， Uid优先使用

	部分参数说明：
		AccountName  用户名

		CreateTime   创建时间

		UserIdentity  会员身份   0：普通会员 1：推广大使

		ParentID  上级ID

	  IsFreeze   账号锁定  0：未锁定 1：锁定

	  BeAgentTime  成为推广大使时间

		IdentityState  身份状态  0：有效 1：失效

		LostAgentTime  身份失效时间

		wImage   微信图像

		wName   微信昵称
*/
exports.getUserInfo = (openid, callback, next) => {
    new normalRequest('/api/user/GetUserInfo', {
        params: { openid: openid },
        post: distributionPost
    }).normalRequest(callback, next);
}


exports.getUserInfo_Post = (req, res, next) => { new normalRequest('/api/user/GetUserInfo', { post: distributionPost }).get(req, res, next); }

/*
		留言反馈 (api/user/feedback)
		入参：
		{
		 "uid": 9,
		 "feedback": "联系方式",
		 "contact": "啊实打实大苏打"
		}
 */
exports.feedback = (req, res, next) => { new normalRequest('/api/user/feedback').post(req, res, next); }

/*
		确认订单(api/user/defaultAddressOrderInfo)
		入参：
		{
		 "uid": 660,
		 "type": 1,
		 "pids": "1635,1769,1770,1638,1751,1711,1752"
		}
 */
exports.defaultAddressOrderInfo = (req, res, next) => { new normalRequest('/api/user/defaultAddressOrderInfo').post(req, res, next); }

exports.defaultAddressOrderInfo_link = (req, res, next) => { new normalRequest('/api/user/defaultAddressOrderInfo').link(req, res, next); }

/*
		提交订单 (api/user/submitOrder)
		入参：
		{
		 "pids": "1742",
		 "uid": 9,
		 "remarks": "",
		 "is_rece": 0,
		 "type": 1,
		 "said": "800",
		 "balance": 0
		}
 */
exports.submitOrder = (req, res, next) => { new normalRequest('/api/user/submitOrder').post(req, res, next); }


/*
		优惠券列表(api/user/couponList)
		入参：
		{
		 "uid": 9,
		 "pagenumber": 1,
		 "pagesize": 20
		}
 */
exports.couponList = (req, res, next) => { new normalRequest('/api/user/couponList').post(req, res, next); }

exports.couponList_link = (req, res, next) => { new normalRequest('/api/user/couponList').link(req, res, next); }

/*
		获取订单可用优惠券(api/user/ValidCouponList)
		入参：
		{
		 "uid": 9,
		 "pagenumber": 1,
		 "pagesize": 20
		}
 */
exports.validCouponList = (req, res, next) => { new normalRequest('/api/user/ValidCouponList').post(req, res, next); }

exports.validCouponList_link = (req, res, next) => { new normalRequest('/api/user/ValidCouponList').link(req, res, next); }


/*
		取消订单(api/user/CancelOrder)
		入参：
		{
		 "uid": 9,
		 "oid": 3265
		}
 */
exports.cancelOrder = (req, res, next) => { new normalRequest('/api/user/CancelOrder').post(req, res, next); }

/*
		确认收货(api/user/TakeDelivery)
		入参：
		{
		 "uid": 9,
		 "oid": 3265
		}
 */
exports.takeDelivery = (req, res, next) => { new normalRequest('/api/user/TakeDelivery').post(req, res, next); }

/*
		个人中心订单列表(api/user/OrderList)
		入参：
		{
		 "pagenumber": 1,
		 "uid": 9,
		 "orderstate": "0",
		 "pagesize": 20
		}
 */
exports.orderList = (req, res, next) => { new normalRequest('/api/user/OrderList').post(req, res, next); }

exports.orderList_link = (req, res, next) => { new normalRequest('/api/user/OrderList').link(req, res, next); }

/*
		订单详情(api/user/orderDetailByOSN)
		入参：
		{
		 "uid": 9,
		 "osn": "201606201537591948"
		}
 */
exports.orderDetailByOSN = (req, res, next) => { new normalRequest('/api/user/orderDetailByOSN').post(req, res, next); }
exports.orderDetailByOSN_link = (req, res, next) => { new normalRequest('/api/user/orderDetailByOSN').link(req, res, next); }

/*
		修改地址后获取运费(api/user/modifyAddressOrderInfo)
		入参：
		{
		 "uid": 9,
		 "weight": 1000,
		 "said": "463"
		}
 */

exports.modifyAddressOrderInfo = (req, res, next) => { new normalRequest('/api/user/modifyAddressOrderInfo').post(req, res, next); }

/*
		申请退款(api/user/ApplyRefund)
		入参：
		{
		 "uid": 9,
		 "oid": 1000,
		 "refundnum": "4",
		 "refundimgs":"",
		 "refundintrud":"",
		 "refundreason":"",
		 "pid":""
		}
 */

exports.applyRefund = (req, res, next) => { new normalRequest('/api/user/ApplyRefund').post(req, res, next); }

/*
	发送验证码，此接口只是提供于 设置 提现安全码  功能
 */

exports.SendSmscode = (req, res, next) => { new normalRequest('/api/user/SendSmscode', { post: distributionPost }).post(req, res, next); }

/*
	验证验证码
 */

exports.CheckSmsCode = (req, res, next) => { new normalRequest('/api/user/CheckSmsCode', { post: distributionPost }).get(req, res, next); }

exports.checkLogin = (req, res, next) => {
    let userinfo = req.cookies.userinfo,
        fromUrl = req.url;
    if (!!userinfo) {
        userinfo = JSON.parse(userinfo);
    }
    if (!userinfo || !userinfo.Uid) {
        //没有runningcatUserInfo表示没有注册或者登录过，需要跳转到注册
        res.redirect("/profile/register.html?fromUrl=" + fromUrl);
    } else {
        next();
    }
}


/*

慈善捐款统计 api/Distribution/GetDonationRecordList
*/

exports.cishan = (req, res, next) => { new normalRequest('/api/Distribution/GetDonationRecordList', { post: distributionPost }).get(req, res, next); }

exports.cishan_link = (req, res, next) => { new normalRequest('/api/Distribution/GetDonationRecordList', { post: distributionPost }).link_g(req, res, next); }

/*
	支付接口
 */
exports.eycharges = (req, res, next) => { new normalRequest('/api/user/Eycharges', { post: distributionPost }).post(req, res, next); }


/*首页轮播*/
exports.homeslide = (req, res, next) => { new normalRequest('/api/user/homeH5').post(req, res, next); }
exports.homeslide_link = (req, res, next) => { new normalRequest('/api/user/homeH5').link_g(req, res, next); }


/*首页关键字倾情推荐*/
exports.homeSearchRecommend = (req, res, next) => { new normalRequest('/api/user/homeSearchRecommend').post(req, res, next); }
exports.homeSearchRecommend_link = (req, res, next) => { new normalRequest('/api/user/homeSearchRecommend').link_g(req, res, next); }


