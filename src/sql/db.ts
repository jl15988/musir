import conDb from './index'

let db: any

export function init () {
  db = conDb()

  return new Promise((resolve, reject) => {
    db.run(`create table if not exists sk (
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                account varchar(100) NOT NULL,
                password varchar(40) NOT NULL,
                remark varchar(500) default null,
                createTime int,
                updateTime int
            )`)
    resolve(db)
  })
}
