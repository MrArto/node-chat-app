var expect = require('expect');
const {isRealString} = require('./validation');



describe('Is Real String?', () => {

  it('should reject non-string values', () => {
  var res = isRealString(98);
  expect(res).toBe(false);
  });

  it('should reject string with spaces', () => {
  var res = isRealString('   ');
  expect(res).toBe(false);
  });

  it('should allow string with non-space character', () => {
  var res = isRealString('Alloha');
  expect(res).toBe(true);
  });
});
 
