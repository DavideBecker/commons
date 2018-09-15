var SocketConnection = new WebSocket(`wss://${window.location.host}`);

SocketConnection.onopen = function(event) {
  console.log('sending: %s', 'Hello Server!')
  SocketConnection.send('Hello Server!')
};

SocketConnection.onmessage = function(event) {
  console.log('recieved: %s', event.data)
};
