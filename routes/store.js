var express = require('express');
var db = require('../config/database');

var router = express.Router();

router.post('/', async(req, res, next) => {
  try {
    let results = await db.store(req.body.gmail);
    res.header("Access-Control-Allow-Origin", "*");
    res.json(results);
  } catch(e) {
    console.log(e);
    console.log('something happened in store.js');
    res.sendStatus(500);
  }
});

router.post('/insert', async(req, res, next) => {
    try {

        //    var geocoder = new kakao.maps.services.Geocoder();
        //    var callback = function(result, status) {
        //        if (status === kakao.maps.services.Status.OK) {
        //            console.log(results)
        //        }
        //    }

        var lat = parseFloat(req.body.latitude);
        var long = parseFloat(req.body.longitude);
        let results = await db.storeinsert(req.body.gmail, req.body.name, req.body.newname, req.body.address, lat, long, req.body.category, req.body.phone, req.body.information);
        if (results === "done") {
            res.header("Access-Control-Allow-Origin", "*");
            res.json(results);
        }
        else {
            res.header("Access-Control-Allow-Origin", "*");
            res.send('x');
        }
        
    } catch(e) {
        console.log(e);
        console.log('something happened in store/insert');
        res.sendStatus(500);
    }
});

router.post('/delete', async(req, res, next) => {
    try {
        let results = await db.storedelete(req.body.gmail, req.body.name);
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
        console.log('something happened in store/insert');
        res.sendStatus(500);
    }
  });

router.post('/update', async(req, res, next) => {
    try {
        var lat = parseFloat(req.body.latitude);
        var long = parseFloat(req.body.longitude);
        let results = await db.storeupdate(req.body.gmail, req.body.name, req.body.address, lat, long, req.body.category, req.body.phone, req.body.information, req.body.newname);
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
        console.log('something happened in store/update');
        res.sendStatus(500);
    }
  }); 

module.exports = router;