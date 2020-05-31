var express = require('express');
var db = require('../config/database');

var router = express.Router();

router.get('/', async(req, res, next) => {
  try {
    let results = await db.accommodation();
    res.header("Access-Control-Allow-Origin", "*");
    res.json(results);
  } catch(e) {
    console.log(e);
    console.log('something happened in card.js');
    res.sendStatus(500);
  }
});

module.exports = router;