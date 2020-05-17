var express = require('express');
var db = require('../config/database');

var router = express.Router();

router.post('/', async(req, res, next) => {
  try {
    const latitude0 = parseFloat(req.body.latitude0);
    const latitude1 = parseFloat(req.body.latitude1);
    const longitude0 = parseFloat(req.body.longitude0);
    const longitude1 = parseFloat(req.body.longitude1);
    let results = await db.find(latitude0, longitude0, latitude1, longitude1);
    res.header("Access-Control-Allow-Origin", "*");
    res.json(results);
  } catch(e) {
    console.log(e);
    console.log('something happened');
    res.sendStatus(500);
  }
});

module.exports = router;