/**
 * Test sample data
 */
const sampleFrom = 100
const sampleSize = 50

module.exports.getList = () => {
  return new Promise((resolve, reject) => {
    let result = []
    for (let i = sampleFrom; i <= sampleFrom + sampleSize; i++) result[i] = {id: i, header: `Header-${i}`}
    setTimeout(() => resolve(result), 2000)
  })
}

module.exports.getOneBody = (id) => {
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
