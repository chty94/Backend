var express = require('express');
var db = require('../config/database');

var router = express.Router();

router.get('/:page', async(req, res, next) => {
  try {
    var offset = (req.params.page-1) * 5;
    let results = await db.showstore(offset);
    console.log(offset);
    res.header("Access-Control-Allow-Origin", "*");
    res.json(results);
  } catch(e) {
    console.log(e);
    console.log('something happened in showstore.js');
    res.sendStatus(500);
  }
});

router.get('/totalpage', async(req, res, next) => {
  try {
    let results = await db.showstoretotalpage();
    var totalPage = 0;
    if (results[0].total === 0) {
      totalPage = 1;
    }
    else {
      totalPage = Math.ceil(results[0].total/10);
    }
    var result = { "total" : totalPage };

    res.header("Access-Control-Allow-Origin", "*");
    res.json(result);
  } catch(e) {
    console.log(e);
    console.log('something happened in showstore/totalpage');
    res.sendStatus(500);
  }
});

router.get('/', async(req, res, next) => {
  try {
    let results = await db.showstore();
    res.header("Access-Control-Allow-Origin", "*");
    res.json(results);
  } catch(e) {
    console.log(e);
    console.log('something happened in showstore.js');
    res.sendStatus(500);
  }
});

module.exports = router;