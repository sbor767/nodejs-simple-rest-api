const morgan = require('morgan')
const bodyParser = require('body-parser')

// Load .env letiables
require('dotenv').load()

// Base
const express = require('express'),
    app = express(),
    port = process.env.SERVER_PORT || 3911,
    connection = require('express-myconnection'),
    mysql = require('mysql'),
    expressValidator = require('express-validator')

//don't show the log when it is test
if(process.env.NODE_ENV !== 'test') {
  //use morgan to log at command line
  app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

// Protect api with the CORS.
const cors = require('cors')
app.use(cors())

app.use( bodyParser.json() )
app.use(expressValidator())

app.use(
  connection(mysql,{
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || 3306,
    user     : process.env.MYSQL_USER || 'root',
    password : process.env.MYSQL_PASSWORD || '',
    database : process.env.MYSQL_DATABASE || 'test',
    debug    : false //set true if you wanna see debug logger
  },'request')
)

// Routes
app.use('/api/v1.0', require('./routes/api/v1_0/messages'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found !!!')
  err.status = 404
  next(err)
})

// Start server
app.listen(port)
console.log(`Starting forum api server on port: ${port}`)

module.exports = app
