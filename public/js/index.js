//var Mustache = require('./libs/mustache');

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

// socket.on('newLocationMessage', function (message) {
// console.log(message);
// var li = jQuery('<li></li>');
// li.text(`${message.from}:`);
//
// jQuery('#messages').append(li);
// });


socket.on('newMessage', function (message) {
  var formatedTime = moment(message.createdAt).format('hh:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formatedTime
  });

  jQuery('#messages').append(html);
  // var formatedTime = moment(message.createdAt).format('hh:mm a');
  // var li = jQuery('<li></li>');
  // li.text(`${message.from} ${formatedTime}: ${message.text}`)
  // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
  var formatedTime = moment(message.createdAt).format('hh:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    createdAt: formatedTime,
    url: message.url
  });



  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target = "_blank">My Current Location</a>')
  //
  // li.text(`${message.from} ${formatedTime} : `)
  // a.attr('href', message.url);
  // li.append(a);
  // jQuery('#messages').append(li);
  jQuery('#messages').append(html);
});


// socket.emit('createMessage', {
//   from: 'Frenk',
//   text: 'Hi'
// }, function (data) {
//   console.log('Got it', data);
// });



var messageTexBox = jQuery('[name=message]');

jQuery('#message_form').on('submit', function(e) {
e.preventDefault();
socket.emit('createMessage', {
  from: 'user',
  text: messageTexBox.val()
}, function () {
messageTexBox.val('');
});
});



var locationButton = jQuery('#send-location');

locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser')
  }

  locationButton.attr('disabled', 'disabled').text('Send location...');
  navigator.geolocation.getCurrentPosition(function (position) {
      locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage', { latitude: position.coords.latitude, longitude: position.coords.longitude});
  }, function () {
    alert('Unable to fetch location').text('Send Location');
    locationButton.removeAttr('disabled');
  })
});



















//
