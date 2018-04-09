const serve = require('serve')
const lighthouse = require('lighthouse')
const chromeLauncher = require('lighthouse/chrome-launcher')

function launchChromeAndRunLighthouse(url, flags = {}, config = null) {
  return chromeLauncher.launch().then(chrome => {
    flags.port = chrome.port
    return lighthouse(url, flags, config).then(results => chrome.kill().then(() => results))
  })
}

const server = serve('./build', { port: 5000 })

const CUTOFF = 80

launchChromeAndRunLighthouse('http://localhost:5000', {}).then(results => {
  let score = results.score
  const catResults = results.reportCategories.map(cat => {
    if (cat.score < CUTOFF) {
      cat.audits.forEach(audit => {
        if (audit.score < CUTOFF) {
          const result = audit.result
          if (result.score) {
            console.warn(`${result.description}: ${result.score}`)
          } else {
            console.warn(result.description)
          }
          if (result.displayValue) {
            console.log(`Value: ${result.displayValue}`)
          }
          console.log(result.helpText)
          console.log(' ')
        }
      })
    }
    return cat
  })
  catResults.forEach(cat => console.log(cat.name, cat.score))
  server.stop()
})
