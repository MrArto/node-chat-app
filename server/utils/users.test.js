const expect = require('expect');
const {Users} = require('./users');


describe ('Users', () => {

var users;
beforeEach(() => {
  users = new Users();
  users.users = [{
    id: '0',
    name: "TestPerson1",
    room: 'Node Test Room'
  },
  {
    id: '1',
    name: "TestPerson2",
    room: 'React Course'
  },
  {
    id: '2',
    name: "TestPerson3",
    room: 'Node Test Room'
  },
]
});



it('should add new user', () => {
var users = new Users();
var user = {
  id: '1315',
  name: "Arto",
  room: 'Office'
};
var resUser = users.addUser(user.id, user.name, user.room);
expect(users.users).toEqual([user]);
});


it('should returns for node test room', () => {
  var userList = users.getUserList('Node Test Room');
  expect(userList).toEqual(['TestPerson1', 'TestPerson3'])
});



it('should remove the user', () => {
  var userId = '1';
  var user = users.removeUser(userId);

  expect(user.id).toBe(userId);
  expect(users.users.length).toBe(2);
});



it('should not remove the user', () => {
  var userId = '81';
  var user = users.removeUser(userId);

  expect(user).toBeFalsy();
  expect(users.users.length).toBe(3);
});








it('should returns user with specifyed id', () => {
  var userId = '2';
  var user = users.getUser(userId);
  expect(user.id).toBe(userId);
});
// it('should returns user with specifyed id', () => {
//   var userId = '2';
//   var user = users.getUser(userId);
//   expect(user).toEqual(users.users[userId]);
// });



it('should not find and returns user with specifyed id', () => {
  var userId = '25';
  var user = users.getUser(userId);
  expect(user).toBeFalsy();
});












});
