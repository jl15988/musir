import os from 'os'

const homedir = os.homedir()

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Database = require('better-sqlite3')

let db: any
// 连接数据库
export default function conDb () {
  // const users = homedir.replace(/\\/g,'\\\\'); // 替换绝对和相对路径
  if (Database) {
    db = new Database(homedir + '\\Documents\\Musir\\sql.db')
  }
  return db
}
