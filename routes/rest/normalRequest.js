import http from './http';

export default class normalRequest {
    constructor(url, options) {
        if (!url) {
            throw new Error('请求URL不能为空！');
        }
        this.options = options;
        if (!this.options) {
            this.options = {};
        }

        if (!this.options.params) {
            this.options.params = {};
        }

        this.url = url;
    }
    link(req, res, next) {
        let opts, self = this,
            success, error;
        success = (d) => {
            let data;
            if (undefined == d || "" == d) {
                next({
                    msg: "服务器异常!"
                });
            } else {
                data = JSON.parse(d);
            }
            if (!res.data) {
                res.data = {};
            }
            res.data[self.url] = data;
            next();
        }
        error = (d) => {
            next({
                msg: "网络异常!"
            });
        }
        if (!!req && "GET" == req.method) {
            opts = req.query;
        } else if (!!req && "POST" == req.method) {
            opts = req.body;
        } else {
            opts = {};
        }

        for (let key of Object.keys(opts)) {
            this.options.params[key] = opts[key]
        }

        return new http(this.options.host, this.options.post).rest(this.url, this.options.params, 'POST', success, error);
    }
    link_g(req, res, next) {
        let opts, self = this,
            success, error;
        success = (d) => {
            let data;
            if (undefined == d || "" == d) {
                next({
                    msg: "服务器异常!"
                });
            } else {
                data = JSON.parse(d);
            }
            if (!res.data) {
                res.data = {};
            }
            res.data[self.url] = data;
            next();
        }
        error = (d) => {
            next({
                msg: "网络异常!"
            });
        }
        if (!!req && "GET" == req.method) {
            opts = req.query;
        } else if (!!req && "POST" == req.method) {
            opts = req.body;
        } else {
            opts = {};
        }

        for (let key of Object.keys(opts)) {
            this.options.params[key] = opts[key]
        }
        return new http(this.options.host, this.options.post).rest(this.url, this.options.params, 'GET', success, error);
    }
    post(req, res, ...rest) {
        let opts, self = this,
            __success, __error;

        let [next, success, error] = rest;

        __success = (d) => {
            let $list, data;
            if (undefined == d || "" == d) {
                next({
                    msg: "服务器异常!"
                });
            } else {
                data = JSON.parse(d);
            }
            if (typeof success === "function") {
                success(data);
            } else {
                return res.status(200).send(data);
            }
        }
        __error = (d) => {
            if (typeof error == "function") {
                error(d);
            } else {
                next({
                    msg: "网络异常!"
                });
            }
        }
        if (!!req && "GET" == req.method) {
            opts = req.query;
        } else if (!!req && "POST" == req.method) {
            opts = req.body;
        } else {
            opts = {};
        }

        for (let key of Object.keys(opts)) {
            this.options.params[key] = opts[key]
        }
        return new http(this.options.host, this.options.post).rest(this.url, this.options.params, 'POST', __success, __error);
    }

    get(req, res, ...rest) {
        let opts, self = this,
            __success, __error;

        let [next, success, error] = rest;

        __success = (d) => {
            let $list, data;
            if (undefined == d || "" == d) {
                next({
                    msg: "服务器异常!"
                });
            } else {
                data = JSON.parse(d);
            }
            if (typeof success === "function") {
                success(data);
            } else {
                return res.status(200).send(data);
            }
        }
        __error = (d) => {
            if (typeof error == "function") {
                error(d);
            } else {
                next({
                    msg: "网络异常!"
                });
            }
        }
        if (!!req && "GET" == req.method) {
            opts = req.query;
        } else if (!!req && "POST" == req.method) {
            opts = req.body;
        } else {
            opts = {};
        }

        for (let key of Object.keys(opts)) {
            this.options.params[key] = opts[key]
        }
        return new http(this.options.host, this.options.post).rest(this.url, this.options.params, 'GET', __success, __error);
    }

    normalRequest(success, next) {
        let __success, __error, data;
        __success = (d) => {
            if (undefined == d || "" == d) {
                next({
                    msg: "服务器异常!"
                });
            } else {
                data = JSON.parse(d);
                success(data);
            }
        }
        __error = (d) => {
            next({
                msg: "网络异常!"
            });
        }

        return new http(this.options.host, this.options.post).rest(this.url, this.options.params, 'GET', __success, __error);
    }
}
