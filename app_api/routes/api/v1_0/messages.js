const express = require('express'),
      router = express.Router(),
      ctrlMessages = require('./controllers/messages')

// Middleware specific to api router
/*
router.use(function(req, res, next) {
  // console.log('API middleware.')
  console.log('API middleware.', req.method, req.url)
  // allows api/v2 endpoints to pass without token, otherwise requires valid token
  let data = req.query || ''
  // @TODO Do some middleware.

  if (data.token !== process.env.API_KEY) {
    let message = 'Not authorized to access this endpoint without valid credentials.'
    console.log(message);
    res.json({
      response: message
    });
  }

  next();
});
*/

// Messages.
router.post('/messages', ctrlMessages.create)
router.get('/messages', ctrlMessages.getList)
router.get('/messages/:message_id', ctrlMessages.getOneBody)
router.delete('/messages/:message_id', ctrlMessages.deleteOne)
router.put('/messages/:message_id', ctrlMessages.updateOne)

module.exports = router
