import normalRequest from '../rest/normalRequest';
/*
		注册手机获取验证码接口（api/SmsCode/register_smscode）
		入参：
		{
		  "phone": "1862xxxxxx",
		  "type": 0
		}
		回参：
			{"code":"1", "message":"手机验证码发送成功！"}
 */
exports.register_smscode = (req, res, next) => { new normalRequest('/api/SmsCode/register_smscode').post(req, res, next); }


/*
	密码找回
 */
exports.sign_recovery = (req, res, next) => { new normalRequest('/api/SmsCode/sign_recovery').post(req, res, next); }