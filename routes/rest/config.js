let argv = process.argv.slice(2);

if ("dev" == argv || "server-dev" == argv) {
    exports.wechat = {
        'appId': 'wx16cd0f3f1f4ee12a',
        'appsecret': 'defcd1c0a12f0e6e383cfde5aff6d30e',
        /* REST 接口 服务器地址 */
        'host':'203.156.219.94',
        /* REST 接口 服务器端口 */
        'post':'8123',
        /* 推广接口 服务器端口 */
        'distributionPost':'8123',
        /* 图片显示前缀 */
        'imageAddress': '',
        /* 图片服务器 地址 */
        'uploadHost': "",
        /* 图片服务器 端口 */
        'uploadPost': "",
        /* 图片上传接口 */
        'uploadUrl': "",
        /*微信授权回调地址*/
        'redirect_uri':"http%3a%2f%2f120.26.231.199%3a9555%2fwechatAuth.html"
    }
} else {
    exports.wechat = {
        'appId': 'wx4e6f77b139c239fc',
        'appsecret': '6b20f42b75e608d229e5046744c0fa0e',
        /* REST 接口 服务器地址 */
        'host':'121.40.195.157',
        /* REST 接口 服务器端口 */
        'post':'9555',
        /* 推广接口 服务器端口 */
        'distributionPost':'9555',
        /* 图片显示前缀 */
        'imageAddress': "",
        /* 图片服务器 地址 */
        'uploadHost': "",
        /* 图片服务器 端口 */
        'uploadPost': "",
        /* 图片上传接口 */
        'uploadUrl': "",
        /*微信授权回调地址*/
        'redirect_uri':"http%3a%2f%2fm.xian17.com%2fwechatAuth.html"
    }
}