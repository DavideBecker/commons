const { fetch } = require('../common')
const cheerio = require('cheerio')
const chalk = require('chalk')

module.exports = async function (
  url,
  {
    filter = 'table',
    expectedLength = false,
    renderNewlines = false,
    imageSrcAttribute = 'src',
  }
) {
  const html = await fetch(url)
  const $ = cheerio.load(html)
  let data = []
  console.log(
    chalk`    Fetching tables from {cyan ${url}} with filter {yellow ${filter}}`
  )
  $(filter).each((i, trData) => {
    const tdList = $('td', trData)
    if (expectedLength === false || expectedLength == tdList.get().length) {
      data.push([])
      tdList.each((tdIndex, tdData) => {
        if (data[data.length - 1]) {
          const $td = $(tdData)
          let tdText = $(tdData).text()
          if (renderNewlines == false) {
            tdText = tdText.replace(/\r?\n|\r/g, '')
          }
          if ($td.find('img').length) {
            tdText = $td.find('img').attr(imageSrcAttribute)
          }

          data[data.length - 1].push(tdText.trim())
        }
      })
    }
  })
  return data
}
