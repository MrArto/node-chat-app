var socket = io();
socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('dissconnected from server');
});


socket.on('connection', function(welcomeMessage) {
  console.log(welcomeMessage);
})

socket.on()










socket.on('newMessage', function (message) {
console.log(message);
});