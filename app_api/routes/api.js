const express = require('express'),
      router = express.Router()

// Middleware specific to api router
router.use(function(req, res, next) {
  console.log('API middleware.')
  // allows api/v2 endpoints to pass without token, otherwise requires valid token
  let data = req.query || ''
  if (!(req.originalUrl.includes("api/v1.0") && data.token !== process.env.API_KEY)) {
    let message = 'Not authorized to access this endpoint without valid credentials.'
    console.log(message);
    res.json({
      response: message
    });
  }
  next();
});

// Import api routes
// TODO: refactor to initialize routes in api folder according to [Directory].[FILENAME]
const api = {
  v1_0: {
    // Must backwards compatible api endpoints for the future API.
    messages: require('./api/v1_0/messages'),
  },
}

// V1.0 API routes
router.all('/api/v1.0/messages', api.v1_0.messages)

module.exports = router;
