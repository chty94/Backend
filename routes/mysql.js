var express = require('express');
var db = require('../config/database');

var router = express.Router();

router.get('/', async(req, res, next) => {
  try {
    let results = await db.all();
    res.json(results);
  } catch(e) {
    console.log(e);
    console.log('something happened');
    res.sendStatus(500);
  }
});

router.post('/', async(req, res, next) => {
  console.log("post request");
  try {
    var gmail = req.body.gmail;
    console.log(req.body);
    let results = await db.one(gmail);
    len = results.length;
    if (len != 0){
      if (results[0].type == '1'){
        res.header("Access-Control-Allow-Origin", "*");
        res.send('g')
      }
      else {
        res.header("Access-Control-Allow-Origin", "*");
        res.send('y')
      }
    }
    else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send('x');
    }
  } catch(e) {
    console.log(e);
    console.log('something happened post');
    res.sendStatus(500);
  }
});

router.post('/insert', async(req, res, next) => {
  console.log("post request");
  try {
    let results = await db.insert(req.body.gmail, req.body.name, req.body.type);
    if (results == "done"){
      res.header("Access-Control-Allow-Origin", "*");
      res.send('y')
    }
    else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send('x');
    }
  } catch(e) {
    console.log(e);
    console.log('something happened post');
    res.sendStatus(500);
  }
});

module.exports = router;