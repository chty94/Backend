var mysql = require('mysql');

//mysql db connection config
var pool = mysql.createPool({
  connectionLimit : 10,
  host     : 'database-1.c76l1p8i60pn.ap-northeast-2.rds.amazonaws.com',
  user     : 'goonin',
  password : 'qwer11!!',
  port     : '3306',
  database : 'goonin_lounge'
});

let chirprdb = {};
chirprdb.all = () => {
  return new Promise((resolve, reject) => {
    pool.query(`select * from  유저`, (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
}

chirprdb.one = (gmail) => {
  return new Promise((resolve, reject) => {
    var sql = `select * from 유저 where gmail=\'`+gmail+'\'';
    console.log(sql);
    pool.query(sql, (err, results) => {
      console.log(results);
      if(err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
}

chirprdb.insert = (gmail, name, type) => {
  return new Promise((resolve, reject) => {
    pool.query(`insert into 유저 values(?, ?, ?)`,[gmail,name,type], (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve("done");
    });
  });
}

chirprdb.find = (latitude0, longitude0, latitude1, longitude1) => {
  return new Promise((resolve, reject) => {
    pool.query(`select *
                from 프렌차이즈상세정보2 natural join 프렌차이즈기본할인
                where latitude > ? and latitude < ? and longitude > ? and longitude < ?`,[latitude0, latitude1, longitude0, longitude1], (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
}


chirprdb.createcontent = (gmail, title, content) => {
  return new Promise((resolve, reject) => {
    pool.query(`insert into 게시판(gmail, title, content, bestnumber) values(?, ?, ?, 0)`, [gmail, title, contetnt], (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve("done");
    });
  });
}



module.exports = chirprdb;
