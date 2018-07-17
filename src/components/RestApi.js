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

/**
 * Test sample part
 */
const sampleFrom = 100
const sampleSize = 50

module.exports.getListSample = () => {
  return new Promise((resolve, reject) => {
    let result = []
    for (let i = sampleFrom; i <= sampleFrom + sampleSize; i++) result[i] = {id: i, header: `Header-${i}`}
    setTimeout(() => resolve(result), 2000)
  })
}

module.exports.getOneBodySample = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id < sampleFrom || id > sampleFrom + sampleSize) {
        reject(`Not found. Id is outside of data ${id}`)
        // return
      }
        resolve(`Body for the ${id} Id.`)
    }, 1000)
  })
}
