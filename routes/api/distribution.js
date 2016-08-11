import normalRequest from '../rest/normalRequest';
import config from '../rest/config';
let distributionPost = config.wechat.distributionPost;

/*
		本月任务完成百分比接口 （api/Distribution/MonthTask）
		入参：Uid  帐户Uid  不能为空

		回参：
			HaveTask   当前月是否有任务   True ：有　 False :无

			IsComplete  是否完成   True ：是　 False :否
 */
exports.monthTask = (req, res, next) => { new normalRequest('/api/Distribution/MonthTask', { post: distributionPost }).get(req, res, next); }

/*
		我的推广费/可提现金额 （api/Distribution/CommitionMoney）
		入参：Uid  帐户Uid  不能为空

		回参：
			FrozenMoney  冻结中的推广费

			WithdrawMoney  可提现金额
 */
exports.commitionMoney = (req, res, next) => { new normalRequest('/api/Distribution/CommitionMoney', { post: distributionPost }).get(req, res, next); }

/*
		推广费首页接口 （api/Distribution/GetIncome）
		入参：Uid  帐户Uid  不能为空

		回参：
			TotalCommission   所有收入

			WithdrawMoney   可提现金额

			Today   今日收入

			Cashed    已提现收入

			FrozenMoney   冻结推广费
 */
exports.getIncome = (req, res, next) => { new normalRequest('/api/Distribution/GetIncome', { post: distributionPost }).get(req, res, next); }

/*
		支付宝提现申请接口 （api/Distribution/WithdrawalApply）
		入参：
			Uid   账户Uid   不可为空

			AccountNo   账号    不可为空

			TrueName   真实姓名   不可为空

			Amount    提现金额    不可为空

			Remark   提现备注    可为空

			Type   提现类型   不可为空   1：支付宝   2：银行卡

			Bank   开户行   提现至银行卡时传入

		回参：
			{"code":"1", "message":"成功！"  }
		说明：提现次数满则返回：
			{"code":"1", "message":"成功！", "data":{"IsLimit":true}  }
 */
exports.withdrawalApply = (req, res, next) => { new normalRequest('/api/Distribution/WithdrawalApply', { post: distributionPost }).post(req, res, next); }

/*
		设置（更新）提现安全码  ( api/Distribution/SetSecurityCode )
		入参：
			Uid   账户Uid   不可为空

			SecurityCode   安全码   不可为空

		回参：
			{"code":"1", "message":"成功！"  }
 */
exports.setSecurityCode = (req, res, next) => { new normalRequest('/api/Distribution/SetSecurityCode', { post: distributionPost }).post(req, res, next); }



/*
		提现记录 （ api/Distribution/CommissionDrawList ）
		入参：Uid  帐户Uid  不能为空

		回参：
			{
		    code = 1;
		    data = [
			           {
			            Date = "2016 - 7";
			            Record = [{
			                    Amount = 1000;
			                    ApplyTime = "/Date(1467616424127)/";
			                    Brokerage = 2;
			                    State = "已打款";
			                    VerifyRemark = "<null>";
			                    VerifyTime = "/Date(1467616424127)/";
			                },
			                                {
			                    Amount = 1000;
			                    ApplyTime = "/Date(1467616424127)/";
			                    Brokerage = 2;
			                    State = "已打款";
			                    VerifyRemark = "<null>";
			                    VerifyTime = "/Date(1467616424127)/";
			                },
			                                {
			                    Amount = 1000;
			                    ApplyTime = "/Date(1467616424127)/";
			                    Brokerage = 2;
			                    State = "已打款";
			                    VerifyRemark = "<null>";
			                    VerifyTime = "/Date(1467616424127)/";
			                },
			                                {
			                    Amount = 1000;
			                    ApplyTime = "/Date(1467530024127)/";
			                    Brokerage = 2;
			                    State = "已打款";
			                    VerifyRemark = "<null>";
			                    VerifyTime = "/Date(1467616424127)/";
			                },
			                                {
			                    Amount = 1000;
			                    ApplyTime = "/Date(1467530024127)/";
			                    Brokerage = 2;
			                    State = "已打款";
			                    VerifyRemark = "<null>";
			                    VerifyTime = "/Date(1467616424127)/";
			                }
			            ];
			        }
			    ];
			    message = "成功";
			}
 */
exports.commissionDrawList = (req, res, next) => { new normalRequest('/api/Distribution/CommissionDrawList', { post: distributionPost }).get(req, res, next); }

exports.commissionDrawList_link = (req, res, next) => { new normalRequest('/api/Distribution/CommissionDrawList', { post: distributionPost }).link_g(req, res, next); }

/*
		三级推广团队的团队人数汇总接口 （ api/Distribution/GetLowerLevelCount ）
		入参：Uid  帐户Uid  不能为空

		回参：
			{"code":"1", "message":"成功", "data":[{"Level":1,"Agent":2,"Normal":2},{"Level":2,"Agent":2,"Normal":2},{"Level":3,"Agent":2,"Normal":2}]  }
			Level   层级   1.一级推广团队 ..... 2,3以此类推

			Agent   推广大使人数

			Normal   普通会员人数
 */
exports.getLowerLevelCount = (req, res, next) => { new normalRequest('/api/Distribution/GetLowerLevelCount', { post: distributionPost }).get(req, res, next); }


/*
		各级人数详情列表 （ api/Distribution/GetLowerLevelDetail ）
		入参：
			Uid      账户Uid    不可为空
			
			lv      层级   不可为空   取值（1,2,3）
			
			identity     身份   不可为空   0：普通会员  1：健康推广大使

		回参：
			{"code":"1", "message":"成功", "data":[{"wImage":null,"wName":null,"Identity":"推广大使","BeAgentTime":"\/Date(-62135596800000)\/"},{"wImage":null,"wName":null,"Identity":"推广大使","BeAgentTime":"\/Date(-62135596800000)\/"}]  }

 */
exports.getLowerLevelDetail = (req, res, next) => { new normalRequest('/api/Distribution/GetLowerLevelDetail', { post: distributionPost }).link_g(req, res, next); }

/*
		下级销量统计 （ api/Distribution/GetSalesCount ）
		入参：
			Uid      账户Uid    不可为空
		回参：
			{"code":"1", "message":"成功", "data":{"totalSales":0.00,"totalCommission":400.00}  }

			totalSales   下级总销量
			totalCommission    合计佣金
 */
exports.getSalesCount = (req, res, next) => { new normalRequest('/api/Distribution/GetSalesCount', { post: distributionPost }).get(req, res, next); }

/*
		下级每月销量统计 （ api/Distribution/GetSalesByMounth ）
		入参：

			Uid    账户Uid   不可为空
			condition   条件   不可为空    0：全部 1：最近三个月 2：最近一年

		回参：
			
			month   统计月份

			Lv1 L2 L3   分别表示 一级 二级 三级 推广大使 

			Normal   普通会员

			Amount   消费金额

			Commission   抽取佣金
 */
exports.getSalesByMounth = (req, res, next) => { new normalRequest('/api/Distribution/GetSalesByMounth', { post: distributionPost }).link_g(req, res, next); }

/*
		验证安全码是否正确 （ api/Distribution/CheckSetSecurityCode ）
		入参：

			Uid   账户Uid    不可为空

			SecurityCode   安全码    不可为空

		回参：
			
			{"code":"1", "message":"成功", "data":{"IsCheck":True}  }

			IsCheck		验证结果

 */
exports.checkSetSecurityCode = (req, res, next) => { new normalRequest('/api/Distribution/CheckSetSecurityCode', { post: distributionPost }).get(req, res, next); }


/*
		绑定已有app账号 （ api/Distribution/AppBind ）
		入参：

			username     账户Uid     不可为空

			userpwd     安全码     不可为空

			OpenID     OpenID     不可为空

			wImage     微信图像     可为空

			wName     微信昵称     可为空
		回参：
			
			{"code":"1", "message":"成功"}

 */
exports.appBind = (req, res, next) => { new normalRequest('/api/Distribution/AppBind', { post: distributionPost }).post(req, res, next); }

/*
	提现验证金额/返回手续费
 */
exports.checkAccountBalance = (req, res, next) => { new normalRequest('/api/Distribution/CheckAccountBalance', { post: distributionPost }).get(req, res, next); }
