export default class log {
    constructor() {}
    write(req, res, next) {
        let record = req.body;
        console.log(record.info);
        res.status(200).send("日志写入成功！");
    }
}