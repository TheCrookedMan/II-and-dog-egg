import normalRequest from '../rest/normalRequest';
/*
		添加购物车(api/Cart/AddProdToCart)
		入参：
		{
		 "uid": 9,
		 "pid": "1742"
		}
 */
exports.addProdToCart = (req, res, next) => { new normalRequest('api/Cart/AddProdToCart').post(req, res, next); }

/*
		根据uId获取购物车信息(api/Cart/CartFullList)
		入参：
		{
		 "uid": 9
		}

 */
exports.cartFullList = (req, res, next) => { new normalRequest('api/Cart/CartFullList').post(req, res, next); }

/*
		编辑购物车(api/Cart/EditCart)
		入参：
		{
		 "uid": 9,
		 "pid": "1742",
		 "num": 1
		}
 */
exports.editCart = (req, res, next) => { new normalRequest('api/Cart/EditCart').post(req, res, next); }

/*
		购物车删除 (api/Cart/DelForCart)
		入参：
		{
		 "uid": 9,
		 "pids": "1699"
		}
 */
exports.delForCart = (req, res, next) => { new normalRequest('api/Cart/DelForCart').post(req, res, next); }