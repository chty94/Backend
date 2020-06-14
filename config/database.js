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

chirprdb.hotrank = () => {
  return new Promise((resolve, reject) => {
    pool.query(`select *
                from
                (
                select *
                from 게시판 natural join (select no, count(gmail) as best, '0' as type from 게시판추천 group by no) as A
                union
                select *
                from 정보게시판 natural join (select no, count(gmail) as best, '1' as type from 정보게시판추천 group by no) as B
                ) as C natural join (select gmail, name from 유저) as D
                where C.best >= 2 and C.gmail = D.gmail
                order by best desc`, (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
}

chirprdb.dailyhotrank = () => {
  return new Promise((resolve, reject) => {
    pool.query(`select *
                from
                (
                select *
                from 게시판 natural join (select no, count(gmail) as best, '0' as type from 게시판추천 group by no) as A
                union
                select *
                from 정보게시판 natural join (select no, count(gmail) as best, '1' as type from 정보게시판추천 group by no) as B
                ) as C natural join (select gmail, name from 유저) as D
                where C.best >= 2 and C.gmail = D.gmail and date = curdate()
                order by best desc`, (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
}

chirprdb.weekhotrank = () => {
  return new Promise((resolve, reject) => {
    pool.query(`select *
                from
                (
                select *
                from 게시판 natural join (select no, count(gmail) as best, '0' as type from 게시판추천 group by no) as A
                union
                select *
                from 정보게시판 natural join (select no, count(gmail) as best, '1' as type from 정보게시판추천 group by no) as B
                ) as C natural join (select gmail, name from 유저) as D
                where C.best >= 2 and C.gmail = D.gmail and date <= curdate() and date >= date(subdate(now(), INTERVAL 7 DAY))
                order by best desc`, (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
}

chirprdb.monthhotrank = () => {
  return new Promise((resolve, reject) => {
    pool.query(`select *
                from
                (
                select *
                from 게시판 natural join (select no, count(gmail) as best, '0' as type from 게시판추천 group by no) as A
                union
                select *
                from 정보게시판 natural join (select no, count(gmail) as best, '1' as type from 정보게시판추천 group by no) as B
                ) as C natural join (select gmail, name from 유저) as D
                where C.best >= 2 and C.gmail = D.gmail and date <= curdate() and date >= date(subdate(now(), INTERVAL 30 DAY))
                order by best desc`, (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
}


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
    from 
    (select name, category, address, latitude, longitude, information, reference
    from 프렌차이즈상세정보2 natural join 프렌차이즈기본할인
    union
    select name, category, address, latitude, longitude, information, null as reference
    from 자영업자할인) as sum
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

chirprdb.totalpage = () => {
  return new Promise((resolve, reject) => {
    pool.query(`select count(*) as total from 게시판`, (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
}

chirprdb.communication = (page) => {
  return new Promise((resolve, reject) => {
    pool.query(`select no, name, title, date, time from 게시판 natural join 유저 order by no desc limit ?, 5`, [page], (err, results) => {
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
    pool.query(`insert into 게시판 values(?, ?, ?, ?, ?, ?)`, [no, gmail, title, content, date, time], (err, results) => {
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
    pool.query(`select 게시판.no, 유저.gmail, name, type, title, content, date, time, count(게시판추천.no) as best
    from 게시판 natural join 유저 left join 게시판추천 on 게시판추천.no = 게시판.no
    where 게시판.no = ?
    group by 게시판.no `, [no], (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
}

// 자신의 가게 정보 가지고 오기
chirprdb.store = (gmail) => {
  return new Promise((resolve, reject) => {
    pool.query(`select 유저.gmail, 유저.name, 자영업자할인.name as storename, 자영업자할인.address, 자영업자할인.latitude, 자영업자할인.longitude, 자영업자할인.category, 자영업자할인.phone, 자영업자할인.information from 자영업자할인 join 유저 where 자영업자할인.gmail=유저.gmail and 유저.gmail=?`, [gmail], (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
}

// 가게 등록
chirprdb.storeinsert = (gmail, name, address, latitude, longitude, category, phone, information) => {
  return new Promise((resolve, reject) => {
    pool.query(`insert into 자영업자할인 values(?,?,?,?,?,?,?,?) `, [gmail, name, address, latitude, longitude, category, phone, information], (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve("done");
    });
  });
}

chirprdb.storedelete = (gmail, name) => {
  return new Promise((resolve, reject) => {
    pool.query(`delete from 자영업자할인 where gmail=? and name=?`, [gmail, name], (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve("done");
    });
  });
}

chirprdb.storeupdate = (gmail, name, newname, address, latitude, longitude, category, phone, information) => {
  return new Promise((resolve, reject) => {
    pool.query(`update 자영업자할인 set name=?, address=?, latitude=?, longitude=?, category=?, phone=?, information=? where gmail=? and name=?`, [newname, address, latitude, longitude, category, phone, information, gmail, name], (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve("done");
    });
  });
}

chirprdb.showstore = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM goonin_lounge.자영업자할인 limit 0, 8`, (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
}

module.exports = chirprdb;
