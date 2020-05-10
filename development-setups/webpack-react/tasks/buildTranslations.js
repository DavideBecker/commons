var yaml = require('js-yaml')
const fs = require('fs-extra')
const path = require('path')

const baseDir = __dirname + '/../src/translations'

async function listFiles(relativePath = './') {
  return fs
    .readdirSync(path.join(baseDir, relativePath))
    .map((file) => path.normalize(path.join(baseDir, relativePath, file)))
}

async function run() {
  const importedTranslations = await listFiles('automatic')
  const manualTranslations = await listFiles('manual')

  const mergedTranslations = [...importedTranslations, ...manualTranslations]
    .map((v) => yaml.safeLoad(fs.readFileSync(v, 'utf-8')))
    .reduce((merged, current) => Object.assign(merged, current), {})

  fs.writeFileSync(
    path.join(baseDir, 'translations.yaml'),
    yaml.safeDump(mergedTranslations)
  )

  console.log('Translations updated')
}

if (require.main === module) {
  run()
}
module.exports = run
