/*
  REST请求，用来 nodejs 统一请求 JAVA API时调用。
 */
import qs from 'querystring';
import $http from 'http';
import $config from './config';
export default class rest {
    constructor(url, options, method, success, error) {
        let jsonObject, optionspost, postheaders, reqPost;

        jsonObject = qs.stringify(options);

        if ('GET' == method && !!jsonObject) {
            url = url + '?' + jsonObject;
        } else if ('POST' == method) {}
        postheaders = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': jsonObject.length
        };

        optionspost = {
            'host': $config.wechat.host,
            'port': $config.wechat.post,
            'path': url,
            'method': method,
            'headers': postheaders
        };
        console.log("当前 REST 使用 " + method + "方式 请求数据，参数 ：" + JSON.stringify(optionspost));
        /*
          do the POST call
         */

        reqPost = $http.request(optionspost, (res) => {
            let dataStr;
            res.setEncoding("utf-8");
            dataStr = "";
            res.on('data', (d) => {
                dataStr += d;
            });
            res.on('end', (ev) => {
                console.log("url:::" + url + "::返回数据::" + dataStr);
                /**
                 * 如果遇见没有任何返回就结束了，一半是 api 没有启动。
                 */
                success(dataStr);
            });
        });
        reqPost.on('error', (e) => {
            error(e);
        });
        /*
          write the json data
          发送REST请求时传入JSON数据
         */
        reqPost.write(jsonObject);
        reqPost.end();
    }
}
