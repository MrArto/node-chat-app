var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('Generate Message', () => {

it('should generate correct message object', () => {
var from = "jane";
var text = "test text";
var message = generateMessage(from, text);

expect(typeof message.createdAt).toBe('number');
expect(message).toMatchObject({from, text});
});
});




describe('Generate Location Message', () => {
  it('should generate correct location object', () => {

var from = 'Admin';
var latitude = 36.365126599999996;
var longitude = 127.33958369999998;
var url = `https://www.google.co.kr/maps?q=${latitude},${longitude}`;

var location = generateLocationMessage(from, latitude, longitude);

expect(location.from).toBe(from);
expect(location.url).toBe(url);
  })
})
