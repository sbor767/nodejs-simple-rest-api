const REST_API_HOST = process.env.REST_API_URL || 'http://forum-test-job.stripway.ru'
const REST_API_PORT = process.env.REST_API_PORT || '4911'
const REST_API_PATH = process.env.REST_API_PATH || 'api/v1.0/messages/'
const REST_API_URL = REST_API_HOST + ':' + REST_API_PORT + '/' + REST_API_PATH

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    // return Promise.reject(new Error(`Code=${response.status} ${response.statusText}`))
    return Promise.reject(new Error(`Code=${response.status} ${response.statusText} RESPONSE=${response.json()}`))
  }
}

function json(response) {
  return response.json()
}

// POST query
function post(message) {
  return fetch(REST_API_URL, {
    method: 'POST',
    headers: {"Content-type": "application/json; charset=UTF-8"},
    body: JSON.stringify(message)
  })
    .then(status)
    .then(json)
}

// GET query
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

// DELETE query
function del(id) {
  return fetch(REST_API_URL + id, {
    method: 'DELETE'
  })
    .then(status)
    // .then(json)
    .then(response => {
      if (response.status === 204) {
        return Promise.resolve(response)
      } else {
        return Promise.reject(new Error(`Code=${response.status} ${response.statusText} RESPONSE=${response.json()}`))
      }
    })
}

// PUT query
function put(message, id) {
  return fetch(REST_API_URL + id, {
    method: 'PUT',
    headers: {"Content-type": "application/json; charset=UTF-8"},
    body: JSON.stringify(message)
  })
    .then(status)
    .then(json)
}

module.exports.create = (message) => post(message)
module.exports.getList = () => get(REST_API_URL)
module.exports.getOneBody = (id) => get(REST_API_URL + id)
module.exports.delete = (id) => del(id)
module.exports.updateOne = (message, id) => put(message, id)