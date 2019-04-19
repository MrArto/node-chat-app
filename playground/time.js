var moment = require('moment');





var someTimestamp = moment().valueOf();

console.log(someTimestamp);

var createdAt = 13587446;

var date = moment(createdAt);

console.log(date.format('hh:mm a'));
