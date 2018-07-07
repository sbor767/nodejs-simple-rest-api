require('dotenv').load()

const mysql = require('mysql'),
  config = {
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'test',
    debug: false //set true if you wanna see debug logger
  },
  conn = mysql.createConnection(config)

module.exports.deleteAll = (callback) => {
  conn.query('DELETE FROM message', (err, res, fields) => {
    if (err) console.log('MySQL delete err.')
    // Connected
    callback()
  })
}

module.exports.createTestData = (callback) => {
  let data = [
    ['header01', 'body01'],
    ['header02', 'body02'],
    ['header03', 'body03'],
    ['header04', 'body04'],
    ['header05', 'body05']
  ]
  conn.query('INSERT INTO message (header, body) VALUES ?', [data], (err, res, fields) => {
    if (err) {
      return next('Mysql error, check your query')
    }
    callback()
  })
}
