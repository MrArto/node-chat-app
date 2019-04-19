var moment = require('moment');



var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf()
  };
};

var generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.co.kr/maps?q=${latitude},${longitude}`,
    createdAt: moment().valueOf()
  };
};


//console.log(date.format('hh:mm a'));





module.exports = {generateMessage, generateLocationMessage};
