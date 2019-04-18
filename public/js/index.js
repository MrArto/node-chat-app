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

socket.on('newLocationMessage', function (message) {
console.log(message);
var li = jQuery('<li></li>');
li.text(`${message.from}:ssss ${message.text}`);

jQuery('#messages').append(li);
});


socket.on('newLocationMessage', function(message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target = "_blank">My Current Location</a>')

  li.text(`${message.from}: `)
  a.attr('href', message.url);
  li.append(a);
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



var locationButton = jQuery('#send-location');

locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser')
  };
  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', { latitude: position.coords.latitude, longitude: position.coords.longitude});
  }, function () {
    alert('Unable to fetch location');
  })
});
