var expect = require('expect');

var {generateMessage} = require('./message');

describe('Generate Message', () => {

it('should generate correct message object', () => {
var from = "jane";
var text = "test text";
var message = generateMessage(from, text);

expect(typeof message.createdAt).toBe('number');
expect(message).toMatchObject({from, text});
});
});
