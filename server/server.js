const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));


io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newEmail', {
    from: 'mike@yaa.com',
    text: 'wwaahaaaa',
    createdAt: 135
  });


  socket.on('createEmail', (newEmail) => {
    console.log('create Email: ', newEmail);
  });


  socket.on('createMessage', (createMessage) => {
    console.log('create Message: ', createMessage);
  });

  socket.emit('newMessage', {
    from: 'mike',
    text: 'wwaahaaaa new message from server',
    createdAt: new Date()
  });



  socket.on('disconnect', () => {
    console.log('user is disconnected');
  });

});




app.get('/', (req, res) => {
  res.send(publicPath);
});

server.listen(port, () => {
  console.log(`Server is up on port: ${port}`);
});
