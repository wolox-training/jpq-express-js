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

module.exports = {
  mockUser,
  mockUserWrongPassword,
  mockUserMissingParams
};
