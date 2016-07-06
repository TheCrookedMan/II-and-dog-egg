import express from 'express';
const router = express.Router();
import common from './tools/common';

router.get('/template/index/index_category.t', [], function(req, res, next) {
	let record = common.toRecord(res.data);
	return res.render('../template/index/index_category', {
        data: record['']
    });
});

module.exports = router;
