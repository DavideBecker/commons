const fs = require('fs-extra')

fs.copySync('./data/json', '../src/data')
fs.copySync('./data/img', '../dist/img')
fs.copySync('./data/translations', '../src/translations/automatic')
