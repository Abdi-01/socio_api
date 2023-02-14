const { dbconf, query } = require("./db");

module.exports = {
    queryFilter: (req, res, next) => {
        // console.log(req.query)
        let filter = [];
        let limit = '';
        let offset = '';
        for (const key in req.query) {
            if (key != 'lmt' && key != 'page') {
                filter.push(`${key}=${dbconf.escape(req.query[key])}`)
            } else if (key == 'lmt') {
                limit = `LIMIT ${req.query[key]}`
            } else if (key == 'page') {
                let page = parseInt(req.query[key]);
                offset = page > 1 ? ` OFFSET ${(page - 1) * parseInt(req.query.lmt)}` : '';
            }
        }
        // console.log(offset)

        req.filter = filter.length > 0 ? `WHERE ${filter.join(' AND ')} ` : ' ';
        req.filter = limit ? req.filter + limit : req.filter;
        req.filter = offset ? req.filter + offset : req.filter;
        next()
    }
}