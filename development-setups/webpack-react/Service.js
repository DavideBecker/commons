var express = require('express')
var app = express()

app.use(express.static('dist'))

// app.get("/", function(req, res) {
//   res.send("Hello World!!!");
// });

app.listen(8180, function () {
  console.log('[Metakit • ACNH] Listening on port 8180!')
})
