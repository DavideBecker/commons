const express = require('express')
const http = require('http')
const WebSocket = require('ws')

const port = process.env.PORT || 8080

const app = express()
app.enable('view cache')
app.set('view engine', 'pug');

const httpServer = http.createServer(app)
const wss = new WebSocket.Server({
  'server': httpServer
})

app.use('/static', express.static('../dist'));

app.get('/', function(req, res) {
  res.render('index', {
    title: 'Hey',
    message: 'Hello there!'
  })
})


wss.on('connection', function connection(ws) {
  console.log('User connected')

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    console.log('sent: %s', 'Hello User!');
    ws.send('Hello User!')
  });
});


httpServer.listen(port)