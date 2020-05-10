var express = require('express');
var router = express.Router();

router.get('/', async(req, res, next) => {
    res.render('post_page', { title : 'mysql_post'})
});
module.exports = router;