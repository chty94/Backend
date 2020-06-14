var express = require('express');
var db = require('../config/database');

var router = express.Router();

// 토탈 추천수
router.get('/', async(req, res, next) => {
  try {
    let results = await db.hotrank();
    res.header("Access-Control-Allow-Origin", "*");
    res.json(results);
  } catch(e) {
    console.log(e);
    console.log('something happened in communication.js');
    res.sendStatus(500);
  }
});

// 데일리 추천수
router.get('/daily', async(req, res, next) => {
  try {
    let results = await db.dailyhotrank();
    res.header("Access-Control-Allow-Origin", "*");
    res.json(results);
  } catch(e) {
    console.log(e);
    console.log('something happened in communication.js');
    res.sendStatus(500);
  }
});

// 일주일 간격 추천수
router.get('/week', async(req, res, next) => {
  try {
    let results = await db.weekhotrank();
    res.header("Access-Control-Allow-Origin", "*");
    res.json(results);
  } catch(e) {
    console.log(e);
    console.log('something happened in communication.js');
    res.sendStatus(500);
  }
});

// 30일 간격 추천수
router.get('/month', async(req, res, next) => {
  try {
    let results = await db.monthhotrank();
    res.header("Access-Control-Allow-Origin", "*");
    res.json(results);
  } catch(e) {
    console.log(e);
    console.log('something happened in communication.js');
    res.sendStatus(500);
  }
});


module.exports = router;