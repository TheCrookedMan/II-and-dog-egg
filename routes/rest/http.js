/*
  REST请求，用来 nodejs 统一请求 JAVA API时调用。
 */
import qs from 'querystring';
import $http from 'http';
import $config from './config';
export default class rest {
    constructor(url, options, success, error) {
        let jsonObject, optionspost, postheaders, reqPost;
        jsonObject = qs.stringify(options);
        postheaders = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': jsonObject.length
        };
        optionspost = {
            'host': $config.wechat.host,
            'port': $config.wechat.post,
            'path': url,
            'method': 'POST',
            'headers': postheaders
        };

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