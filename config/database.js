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

chirprdb.franchise = () => {
  return new Promise((resolve, reject) => {
    pool.query(`select * from  프렌차이즈기본할인`, (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
}

chirprdb.card = () => {
  return new Promise((resolve, reject) => {
    pool.query(`select * from  카드할인2`, (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
}

chirprdb.accommodation = () => {
  return new Promise((resolve, reject) => {
    pool.query(`select name, address, information, phone from 숙박할인2`, (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
}

chirprdb.communication = () => {
  return new Promise((resolve, reject) => {
    pool.query(`select no, name, title, date, time from 게시판 natural join 유저`, (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
}

// select no from 게시판 order by no DESC limit 1;
chirprdb.findno = () => {
  return new Promise((resolve, reject) => {
    pool.query(`select no from 게시판 order by no DESC limit 1`, (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve(results)
    })
  });
}

chirprdb.communicationinsert = (no, gmail, title, content, date, time) => {
  return new Promise((resolve, reject) => {
    pool.query(`insert into 게시판 values(?, ?, ?, ?, ?, ?, 0)`, [no, gmail, title, content, date, time], (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve("done");
    });
  });
}

chirprdb.communicationdelete = (no) => {
  return new Promise((resolve, reject) => {
    pool.query(`delete from 게시판 where no=?`, [no], (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve("done");
    });
  });
}

// best click
chirprdb.pushbest = (no, gmail) => {
  return new Promise((resolve, reject) => {
    pool.query(`insert into 게시판추천 values(?,?)`, [no, gmail], (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve("done");
    });
  });
}

// best not click
chirprdb.deletebest = (no, gmail) => {
  return new Promise((resolve, reject) => {
    pool.query(`delete from 게시판추천 where no=? and gmail=?`, [no, gmail], (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve("done");
    });
  });
}
chirprdb.getbest = (no) => {
  return new Promise((resolve, reject) => {
    pool.query(`select gmail from 게시판추천 where no=?`, [no], (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
}

// UPDATE `goonin_lounge`.`게시판` SET `title` = 'update', `content` = 'update중입니다.' WHERE (`no` = '5');
chirprdb.communicationupdate = (no, title, content, date, time) => {
  return new Promise((resolve, reject) => {
    pool.query(`update 게시판 set title=?, content=?, date=?, time=? where no=?`, [title, content, date, time, no], (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve("done");
    });
  });
}

chirprdb.read = (no) => {
  return new Promise((resolve, reject) => {
    pool.query(`select no, gmail, name, type, title, content, date, time, best from 게시판 natural join 유저 where no=?`, [no], (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
}

module.exports = chirprdb;
