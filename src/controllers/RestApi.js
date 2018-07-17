const REST_API_HOST = process.env.REST_API_URL || 'http://forum-test-job.stripway.ru'
const REST_API_PORT = process.env.REST_API_PORT || '4911'
const REST_API_PATH = process.env.REST_API_PATH || 'api/v1.0/messages/'
const REST_API_URL = REST_API_HOST + ':' + REST_API_PORT + '/' + REST_API_PATH

// GET Requests
function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(`Code=${response.status} ${response.statusText}`))
  }
}

function json(response) {
  return response.json()
}

function get(url) {
  return fetch(url)
    .then(status)
    .then(json)
  /*
      .then(function(data) {
        console.log('Request succeeded with JSON response', data)
      }).catch(function(error) {
      console.log('Request failed', error)
    })
  */
}

module.exports.getList = () => get(REST_API_URL)
module.exports.getOneBody = (id) => get(REST_API_URL + id)