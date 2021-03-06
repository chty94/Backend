var express = require('express');
var db = require('../config/database');

var router = express.Router();

router.get('/totalpage', async(req, res, next) => {
  try {
    let results = await db.totalpage();
    var totalPage = 0;
    if (results[0].total === 0) {
      totalPage = 1;
    }
    else {
      totalPage = Math.ceil(results[0].total/5);
    }
    var result = { "total": totalPage };

    res.header("Access-Control-Allow-Origin", "*");
    res.json(result);
  } catch(e) {
    console.log(e);
    console.log('something happened in communication/totalpage');
    res.sendStatus(500);
  }
});

router.get('/:page', async(req, res, next) => {
  try {
    var offset = (req.params.page-1) * 5;
    let results = await db.communication(offset);
    res.header("Access-Control-Allow-Origin", "*");
    res.json(results);
  } catch(e) {
    console.log(e);
    console.log('something happened in communication.js');
    res.sendStatus(500);
  }
});

router.post('/read', async(req, res, next) => {
  try {
    let results = await db.read(req.body.no);
    res.header("Access-Control-Allow-Origin", "*");
    res.json(results);
  } catch(e) {
    console.log(e);
    console.log('something happened in communication/read');
    res.sendStatus(500);
  }
});
// push best
router.post('/pushbest', async(req, res, next) => {
  try {
    let results = await db.pushbest(req.body.no, req.body.gmail);
    if (results == "done"){
      res.header("Access-Control-Allow-Origin", "*");
      res.json(results);
    }
    else{
      res.header("Access-Control-Allow-Origin", "*");
      res.send('x');
    }
    
  } catch(e) {
    console.log(e);
    console.log('something happened in communication/getbest');
    res.sendStatus(500);
  }
});

// delete best
router.post('/deletebest', async(req, res, next) => {
  try {
    let results = await db.deletebest(req.body.no, req.body.gmail);
    if (results == "done") {
      res.header("Access-Control-Allow-Origin", "*");
      res.json(results);
    }
    else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send("x");
    }
  } catch(e) {
    console.log(e);
    console.log('something happened in communication/getbest');
    res.sendStatus(500);
  }
});

// get best
router.post('/getbest', async(req, res, next) => {
  try {
    let results = await db.getbest(req.body.no);
    res.header("Access-Control-Allow-Origin", "*");
    res.json(results);
  } catch(e) {
    console.log(e);
    console.log('something happened in communication/getbest');
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
    console.log('something happened in communication/createContent.js');
    res.sendStatus(500);
  }
});

router.post('/delete', async(req, res, next) => {
  try {
    let results = await db.communicationdelete(req.body.no);
    if (results == "done") {
      res.header("Access-Control-Allow-Origin", "*");
      res.json(results);
    }
    else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send('x');
    }
  } catch(e) {
    console.log(e);
    console.log('something happened in communication/read');
    res.sendStatus(500);
  }
});

router.post('/update', async(req, res, next) => {
  try {
    let results = await db.communicationupdate(req.body.no, req.body.title, req.body.content, req.body.date, req.body.time)
    if (results == "done") {
      res.header("Access-Control-Allow-Origin", "*");
      res.json(results);
    }
    else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send('x');
    }
  } catch(e) {
    console.log(e);
    console.log('something happened in communication/read');
    res.sendStatus(500);
  }
});
module.exports = router;