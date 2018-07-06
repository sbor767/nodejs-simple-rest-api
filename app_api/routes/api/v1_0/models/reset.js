/**
 * This middleware wait for the defined 'is over' time and resets db and states.
 * This need to avoid store the spammed messages.
 */

const async = require('async')

let changed = false
let initTime = undefined

module.exports.setChanged = () => changed = true
module.exports.isChanged = () => changed

/**
 * Check time is over.
 * Time limits set as 10'
 */
const timeIsOver = () => {
  return new Date().getTime() - initTime > 10 * 60
}

module.exports.init = (req, res, next) => {
  if (!changed || !timeIsOver()) return

  initTime = new Date().getTime()

  async.series([
    _delete = callback => {
      req.getConnection((err,conn) => {
        if (err) return next("Cannot connect to MySQL DB.")

        let query = conn.query('DELETE FROM message', (err, rows) => {
          if (err) {
            return next("Mysql error, check your query")
          }
          callback()
        })
      })
    },
    _create = callback => {
      //Fill some test data.
      let data = [
        ['header01','body01'],
        ['header02','body02'],
        ['header03','body03'],
        ['header04','body04'],
        ['header05','body05']
      ]

      //inserting into mysql
      req.getConnection((err, conn) => {
        if (err) return next("Cannot connect to MySQL DB.")

        let query = conn.query('INSERT INTO message (header, body) VALUES ?', [data], (err, rows) => {
          if (err) {
            return next("Mysql error, check your query")
          }
          callback()
        })
      })

    }
  ])
  changed = false
}
