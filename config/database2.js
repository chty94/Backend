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

chirprdb.infocommunication = () => {
  return new Promise((resolve, reject) => {
    pool.query(`select no, name, title, date, time from 정보게시판 natural join 유저`, (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
}

chirprdb.infototalpage = () => {
  return new Promise((resolve, reject) => {
    pool.query(`select count(*) as total from 정보게시판`, (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
}

chirprdb.infocommunication = (page) => {
  return new Promise((resolve, reject) => {
    pool.query(`select no, name, title, date, time from 정보게시판 natural join 유저 order by no limit ?, 5`, [page], (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
}


// select no from 게시판 order by no DESC limit 1;
chirprdb.infofindno = () => {
  return new Promise((resolve, reject) => {
    pool.query(`select no from 정보게시판 order by no DESC limit 1`, (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve(results)
    })
  });
}

chirprdb.infocommunicationinsert = (no, gmail, title, content, date, time) => {
  return new Promise((resolve, reject) => {
    pool.query(`insert into 정보게시판 values(?, ?, ?, ?, ?, ?)`, [no, gmail, title, content, date, time], (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve("done");
    });
  });
}

chirprdb.infocommunicationdelete = (no) => {
  return new Promise((resolve, reject) => {
    pool.query(`delete from 정보게시판 where no=?`, [no], (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve("done");
    });
  });
}

// best click
chirprdb.infopushbest = (no, gmail) => {
  return new Promise((resolve, reject) => {
    pool.query(`insert into 정보게시판추천 values(?,?)`, [no, gmail], (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve("done");
    });
  });
}

// best not click
chirprdb.infodeletebest = (no, gmail) => {
  return new Promise((resolve, reject) => {
    pool.query(`delete from 정보게시판추천 where no=? and gmail=?`, [no, gmail], (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve("done");
    });
  });
}
chirprdb.infogetbest = (no) => {
  return new Promise((resolve, reject) => {
    pool.query(`select gmail from 정보게시판추천 where no=?`, [no], (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
}

// UPDATE `goonin_lounge`.`게시판` SET `title` = 'update', `content` = 'update중입니다.' WHERE (`no` = '5');
chirprdb.infocommunicationupdate = (no, title, content, date, time) => {
  return new Promise((resolve, reject) => {
    pool.query(`update 정보게시판 set title=?, content=?, date=?, time=? where no=?`, [title, content, date, time, no], (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve("done");
    });
  });
}

chirprdb.inforead = (no) => {
  return new Promise((resolve, reject) => {
    pool.query(`select 정보게시판.no, 유저.gmail, name, type, title, content, date, time, count(정보게시판추천.no) as best
    from 정보게시판 natural join 유저 left join 정보게시판추천 on 정보게시판추천.no = 정보게시판.no
    where 정보게시판.no = ?
    group by 정보게시판.no `, [no], (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
}

module.exports = chirprdb;
