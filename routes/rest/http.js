/*
  REST请求，用来 nodejs 统一请求 JAVA API时调用。
 */
import qs from 'querystring';
import $http from 'http';
import $config from './config';

export default class rest {
    constructor(url, options, method, success, error) {
        let jsonObject, optionspost, postheaders, reqPost, contentType = "application/x-www-form-urlencoded";

        if ('GET' == method) {
            jsonObject = qs.stringify(options) ;
            url = !!jsonObject ? (url + '?' + jsonObject) : url;
        } else if ('POST' == method) {
            contentType = "application/json";
            jsonObject = JSON.stringify(options);
        }
        postheaders = {
            'Content-Type': contentType,
            'Content-Length': jsonObject.length,
            'cache-control': 'no-cache',
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
            let chunks = [];
            res.setEncoding("utf-8");
            res.on('data', (chunk) => {
                chunks.push(chunk);
            });
            res.on('end', (ev) => {
                let body = chunks.join("");

                console.log("url:::" + url + "::返回数据::" + body);
                /**
                 * 如果遇见没有任何返回就结束了，一般是 api 没有启动。
                 */
                success(body);
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
