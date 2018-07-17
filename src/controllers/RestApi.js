module.exports.getList = () => {
  return fetch('http://forum-test-job.stripway.ru:4911/api/v1.0/messages')
    .then(response => {
      console.log('getList-response:', response)
      let json = response.json()
      console.log('getList-response-json:', json)
      // return response.json()})
      return json})
}

module.exports.getOneBody = (id) => {
  return fetch(`http://forum-test-job.stripway.ru:4911/api/v1.0/messages/${id}`)
    .then(response => response.json())
}