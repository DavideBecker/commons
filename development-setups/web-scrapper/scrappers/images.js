const chalk = require('chalk')
const { fetch } = require('../common')

// From: https://gist.github.com/bgrins/6194623
function isDataURL(s) {
  return !!s.match(isDataURL.regex)
}
isDataURL.regex = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i

module.exports = function (url) {
  if (isDataURL(url)) {
    console.log(chalk`    Converting {cyan base64} image to buffer`)
    let base64Image = url.split(';base64,').pop()
    return Buffer.from(base64Image, 'base64')
  } else {
    console.log(chalk`    Fetching image from {cyan ${url}}`)
    return fetch(url, 'buffer')
  }
}
