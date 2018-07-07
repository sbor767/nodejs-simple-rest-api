// const mysql, initMySql = require('../models/mysql')
const { setChanged } = require('../models/reset')

const sendJSONresponse = (res, status, content) => {
  res.status(status)
  res.json(content)
}

module.exports.create = (req, res) => {
  // res.status(200)
  // res.json({"status": "success"})

  //validation
  req.assert('header','Header is required').notEmpty()
  req.assert('header','Header length must be 1..64').len(1, 64)
  req.assert('body','Body is required').notEmpty()

  let errors = req.validationErrors()
  if (errors) return sendJSONresponse(res, 422, errors)

  //get data
  let data = {
    header: req.body.header,
    body: req.body.body
  }

  //inserting into mysql
  req.getConnection((err, conn) => {
    if (err) return next("Cannot connect to MySQL DB.")

    let query = conn.query('INSERT INTO message SET ?', data, (err, rows) => {
      if (err) {
        return next("Mysql error, check your query")
      }
      // sendJSONresponse(res, 201, rows.affectedRows || 0)
      sendJSONresponse(res, 201, rows.insertId || undefined)
      setChanged()
    })
  })
}

module.exports.getList = (req, res, next) => {
  req.getConnection((err,conn) => {
    if (err) return next("Cannot connect to MySQL DB.")

    let query = conn.query('SELECT id, header FROM message', (err, rows) => {
      if (err) {
        // console.log(err);
        return next("Mysql error, check your query")
        // sendJSONresponse(res, 501, `Mysql error, check your query. Code=${err.code} Msg=${err.message}`)
        // return
      }
      sendJSONresponse(res, 200, rows)
    })
  })
}

module.exports.getOneBody = (req, res, next) => {
  let messageId = req.params.message_id
  req.getConnection((err,conn) => {
    if (err) return next("Cannot connect to MySQL DB.")

    let query = conn.query('SELECT body FROM message WHERE id=?', [messageId], (err, rows) => {
      if (err) {
        return next("Mysql error, check your query")
      }
      // If message NOT found.
      if (rows.length < 1) return sendJSONresponse(res, 416, 'Message Not found')
      sendJSONresponse(res, 200, rows[0].body)
    })
  })
}

module.exports.deleteOne = (req, res, next) => {
  let messageId = req.params.message_id
  req.getConnection((err,conn) => {
    if (err) return next("Cannot connect to MySQL DB.")

    // let query = conn.query('DELETE FROM message WHERE id=?', [messageId], (err, rows) => {
    let query = conn.query('DELETE FROM message WHERE id=?', messageId, (err, rows) => {
      if (err) {
        return next("Mysql error, check your query")
      }
      // If message NOT found.
      if (rows.affectedRows === 0) return sendJSONresponse(res, 416, 'Message Not found')
      // sendJSONresponse(res, 204, rows.affectedRows)
      // 204 must return no content.
      sendJSONresponse(res, 204, '')
      setChanged()
    })
  })
}

module.exports.updateOne = (req, res) => {
  let messageId = req.params.message_id

  //validation
  req.assert('header','Header is required').notEmpty()
  req.assert('header','Header length must be 1..64').len(1, 64)
  req.assert('body','Body is required').notEmpty()

  let errors = req.validationErrors()
  if (errors) return sendJSONresponse(res, 422, errors)

  //get data
  let data = {
    header: req.body.header,
    body: req.body.body
  }

  //inserting into mysql
  req.getConnection((err, conn) => {
    if (err) return next("Cannot connect to MySQL DB.")

    let query = conn.query('UPDATE message SET ? WHERE id=?', [data, messageId], (err, rows) => {
      if (err) {
        return next("Mysql error, check your query")
      }
      sendJSONresponse(res, 200, rows.changedRows || 0)
      setChanged()
    })
  })
}
