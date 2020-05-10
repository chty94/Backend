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
    let results = await db.one(gmail);
    len = results.length;
    if (len != 0){
      /*
      if문 돌려서 받은  results값에서 type 비교해서 
      res.send('o');
      또는
      res.send('g');
      작성하면 됨
      */
    }
    else {
      res.send('x');
    }
    
  } catch(e) {
    console.log(e);
    console.log('something happened post');
    res.sendStatus(500);
  }
});

module.exports = router;