module.exports.getList = () => {
  return fetch('http://forum-test-job.stripway.ru:4911/api/v1.0/messages')
    .then(response => {
      console.log('getList-response:', response)
      let json = response.json()
      console.log('getList-response-json:', json)
      // return response.json()})
      return json})
}
module.exports.getListSample = () => {
  return new Promise((resolve, reject) => {
    let result = []
    for (let i = 100; i <= 150; i++) result[i] = {id: i, header: `Header-${i}`}
    setTimeout(() => resolve(result), 2000)
  })
}

module.exports.getOneBody = (id) => {
  return fetch(`http://forum-test-job.stripway.ru:4911/api/v1.0/messages/${id}`)
    .then(response => response.json())
}
module.exports.getOneBodySample = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      switch (id) {
        case 100:
          reject('Not found.')
          break
        case 104:
          resolve('Sample body for 104.')
          break
        default:
          resolve('Some other sample body.')
      }
    }, 1000)
  })
}
