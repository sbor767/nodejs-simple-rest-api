const express = require('express'),
      router = express.Router(),
      ctrlMessages = require('./controllers/messages')
      reset = require('./models/reset')

// Middleware specific to api router
// Wait for the defined 'is over' time and resets db and states.
// This need to avoid store the spammed messages.
router.use((req, res, next) => {
  console.log('API reset middleware.')
  reset.init(req, res, next)
  next();
});

// Messages.
router.post('/messages', ctrlMessages.create)
router.get('/messages', ctrlMessages.getList)
router.get('/messages/:message_id', ctrlMessages.getOneBody)
router.delete('/messages/:message_id', ctrlMessages.deleteOne)
router.put('/messages/:message_id', ctrlMessages.updateOne)

module.exports = router
