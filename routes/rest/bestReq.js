import request from 'request';

export default class bestReq {
    request(url, params, method, success) {
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
            success(body, response);
        });
    }
}
