require('dotenv').load()

const mysql = require('mysql'),
      config = {
        host: process.env.MYSQL_HOST || 'localhost',
        port: process.env.MYSQL_PORT || 3306,
        user     : process.env.MYSQL_USER || 'root',
        password : process.env.MYSQL_PASSWORD || '',
        database : process.env.MYSQL_DATABASE || 'test',
        debug    : false //set true if you wanna see debug logger
      },
      conn = mysql.createConnection(config)

module.exports.deleteAll = (callback) => {
// module.exports.deleteAll = () => {
//   console.log(config)
  conn.query('DELETE FROM message', (err, res, fields) => {
    if (err) console.log('MySQL delete err.')
    // Connected
    callback()
  })
}
