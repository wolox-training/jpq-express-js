const faker = require('faker');

const mockUser = {
  email: faker.internet.email(null, null, 'wolox.com.ar'),
  password: faker.internet.password(8),
  name: faker.name.firstName(),
  lastName: faker.name.lastName()
};

const mockUserMissingParams = {
  email: faker.internet.email(null, null, 'wolox.com.ar'),
  lastName: faker.name.lastName()
};

const mockUserWrongPassword = {
  ...mockUser,
  password: faker.internet.password(5)
};

const authorizationToken = {
  authorization:
    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjYwLCJlbWFpbCI6Imp1YW5wYWJsby5xdWljZW5vQHdvbG94LmNvbS5hciIsImlhdCI6MTU2ODA1ODQ2NH0.d-zcu7yZfTSLoj2iGJeM9NsL4s4DnODJU3LtA0UfzCQ'
};

module.exports = {
  mockUser,
  mockUserWrongPassword,
  mockUserMissingParams,
  authorizationToken
};
