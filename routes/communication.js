var express = require('express');
var db = require('../config/database');

var router = express.Router();

router.get('/', async(req, res, next) => {
  try {
    let results = await db.communication();
    res.header("Access-Control-Allow-Origin", "*");
    res.json(results);
  } catch(e) {
    console.log(e);
    console.log('something happened in communication.js');
    res.sendStatus(500);
  }
});

router.post('/createContent', async(req, res, next) => {
  try {
    console.log('Create Content');
    const result = await db.findno();
    let results = await db.communicationinsert(result[0].no+1, req.body.name, req.body.title, req.body.content, req.body.date, req.body.time);
    console.log(req.body);
    if (results == "done"){
      res.header("Access-Control-Allow-Origin", "*");
      res.json(results);
    }
    else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send("x");
    }
  } catch(e) {
    console.log(e);
    console.log('something happened in createContent.js');
    res.sendStatus(500);
  }
});

module.exports = router;