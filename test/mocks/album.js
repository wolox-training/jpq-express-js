const faker = require('faker');

const mockUserAlbum = {
  userId: faker.random.number(),
  albumId: faker.random.number(null, 100)
};

const mockUserAlbumInvalid = {
  ...mockUserAlbum,
  albumId: faker.random.number(101)
};

module.exports = {
  mockUserAlbum,
  mockUserAlbumInvalid
};
