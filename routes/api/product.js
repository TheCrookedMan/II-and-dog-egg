import normalRequest from '../rest/normalRequest';

/*
		产品列表(api/Product/ProductList)
		入参：
		{
		 "page": 1,
		 "pagesize": 20,
		 "sortdirection": 0,
		 "sortcolumn": 0,
		 "cid": "120"
		}
 */
exports.productList = (req, res, next) => { new normalRequest('/api/Product/ProductList').post(req, res, next); }

/*
	产品列表 link 方式获取
 */

exports.productList_link = (req, res, next) => { new normalRequest('/api/Product/ProductList').link(req, res, next); }

/*
		商品详情页(api/Product/productDetail)
		入参：
		{
		 "pid": 1733
		}
 */
exports.productDetail = (req, res, next) => { new normalRequest('/api/Product/productDetail').post(req, res, next); }

/*
		搜索(api/Product/homeSearch)
		入参：
		{
		 "page": 1,
		 "pagesize": 20,
		 "sortdirection": 0,
		 "sortcolumn": 0,
		 "searchkey": "蛋"
		}
 */
exports.homeSearch = (req, res, next) => { new normalRequest('/api/Product/homeSearch').post(req, res, next); }