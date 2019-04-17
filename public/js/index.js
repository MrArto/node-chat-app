var socket = io();
socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('dissconnected from server');
});

socket.on('newEmail', function (email) {
  console.log('new email');
  console.log(email);
});

socket.emit('createEmail', {
to: 'gane@email',
text: 'hey from browser'
});


socket.emit('createMessage', {
from: 'gane',
text: 'hey from browser',
createdAt: new Date()
});


socket.on('newMessage', function (newMessage) {
console.log(newMessage);
});

//newMessage
//createMessage
