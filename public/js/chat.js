var socket = io();



function scrollToBottom () {
//selectors
var messages = jQuery('#messages');
var newMessage = messages.children('li:last-child');
//heights
var clientHeight = messages.prop('clientHeight');
var scrollTop = messages.prop('scrollTop');
var scrollHeight = messages.prop('scrollHeight');
var newMessageHeigth = newMessage.innerHeight();
var lastMessageHeight = newMessage.prev().innerHeight();

if (clientHeight + scrollTop + newMessageHeigth + lastMessageHeight >= scrollHeight) {
  messages.scrollTop(scrollHeight);
};
}



socket.on('connect', function () {
  var params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function(err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
        console.log('No error');
    }
  });
//  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('dissconnected from server');
});



socket.on('updateUserList', function (users) {
  var ol = jQuery('<ol></ol>');
  users.forEach(function (user) {
    ol.append(jQuery('<li></li>').text(user));
  });
console.log('Users list', users);
jQuery('#users').html(ol);
});





socket.on('connection', function(message) {
  console.log(message);
});



socket.on('newMessage', function (message) {
  var formatedTime = moment(message.createdAt).format('hh:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formatedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
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
  scrollToBottom();
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
