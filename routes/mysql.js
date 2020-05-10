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
    if (len !== 0){
      /*
      여기서 DB서버에 데이터가 있으면 해야할일을 넣으면 됨
      */
      res.json(results[0]);
    }
    else {
      /*
      여기서 name이랑 type을 받아서 넘기면 됨.
      밑에 장동재랑 0은 임시로 넣어둔것.
      */      
      var name = "장동재";
      var type = '0'
      await db.insert(gmail, name, type);
      res.send('data is inserted');
    }
    
  } catch(e) {
    console.log(e);
    console.log('something happened post');
    res.sendStatus(500);
  }
});
/*
// gmail(get 확인용)
router.get('/:gmail', async(req, res, next) => {
  try {
    let results = await db.one(req.params.gmail);
    res.json(results[0]);
  } catch(e) {
    console.log(e);
    console.log('something happened');
    res.sendStatus(500);
  }
});
*/
module.exports = router;