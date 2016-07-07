/*
  REST请求，用来 nodejs 统一请求 JAVA API时调用。
 */
import qs from 'querystring';
import $http from 'http';
import $config from './config';
import request from 'request';
export default class rest {
    constructor(url, options, method, success, error) {
        let jsonObject, optionspost, postheaders, reqPost, contentType = "application/x-www-form-urlencoded";

        if ('GET' == method && !!jsonObject) {
            jsonObject = qs.stringify(options);
            url = url + '?' + jsonObject;
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
    request(url, params, method, success, error) {
        let options = {
            method: method,
            url: 'http://' + $config.wechat.host + ':' + $config.wechat.post + url,
            headers: {
                'cache-control': 'no-cache',
                'content-type': 'application/json'
            },
            body: JSON.stringify(params)
        };

        request(options, function(error, response, body) {
            if (error) throw new Error(error);

            console.log(body);
        });
    }
}
