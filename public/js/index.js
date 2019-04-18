var socket = io();
socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('dissconnected from server');
});


socket.on('connection', function(message) {
  console.log(message);
});

socket.on('newMessage', function (message) {
console.log(message);
var li = jQuery('<li></li>');
li.text(`${message.from}: ${message.text}`);
jQuery('#messages').append(li);
});


// socket.emit('createMessage', {
//   from: 'Frenk',
//   text: 'Hi'
// }, function (data) {
//   console.log('Got it', data);
// });


jQuery('#message_form').on('submit', function(e) {
e.preventDefault();
socket.emit('createMessage', {
  from: 'user',
  text: jQuery('[name=message]').val()
}, function () {

});
});
