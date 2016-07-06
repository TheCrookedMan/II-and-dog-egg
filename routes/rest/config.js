let argv = process.argv.slice(2);

if ("dev" == argv) {
    exports.wechat = {
        // 'appId': 'wx16cd0f3f1f4ee12a',
        // 'appsecret': 'defcd1c0a12f0e6e383cfde5aff6d30e',
        /* REST 接口 服务器地址 */
        'host':'203.156.219.94',
        /* REST 接口 服务器端口 */
        'post':'5698',
        /* 图片显示前缀 */
        'imageAddress': '',
        /* 图片服务器 地址 */
        'uploadHost': "",
        /* 图片服务器 端口 */
        'uploadPost': "",
        /* 图片上传接口 */
        'uploadUrl': ""
    }
} else {
    exports.wechat = {
        // 'appId': 'wx16cd0f3f1f4ee12a',
        // 'appsecret': 'defcd1c0a12f0e6e383cfde5aff6d30e',
        /* REST 接口 服务器地址 */
        'host':'203.156.219.94',
        /* REST 接口 服务器端口 */
        'post':'5698',
        /* 图片显示前缀 */
        'imageAddress': '',
        /* 图片服务器 地址 */
        'uploadHost': "",
        /* 图片服务器 端口 */
        'uploadPost': "",
        /* 图片上传接口 */
        'uploadUrl': ""
    }
}