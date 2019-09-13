'use strict';

const supertest = require('supertest');
const app = require('../app');
const { authorizationToken } = require('./mocks/user');
const { mockUserAlbum, mockUserAlbumInvalid } = require('./mocks/album');
const { UserAlbum } = require('../app/models');
const { getAlbums } = require('../app/services/album');
const { validationUserError } = require('../app/errors');

const request = supertest(app);

describe('Test /albums', () => {
  it('Buy album with correct params', () => {
    const { albumId } = mockUserAlbumInvalid;
    request
      .post(`/albums/${albumId}`)
      .set(authorizationToken)
      .send(mockUserAlbum)
      .then(getAlbums(albumId))
      .then(async response => {
        expect(response.statusCode).toBe(200);
        expect(await UserAlbum.findOne({ where: mockUserAlbum })).toBe(mockUserAlbum);
      });
  });

  it('Buy album without authorization token', () => {
    request
      .post(`/albums/${mockUserAlbum.albumId}`)
      .send(mockUserAlbum)
      .then(getAlbums(mockUserAlbum.albumId))
      .then(response => {
        expect(response.body).to.include(validationUserError);
        expect(response.body.message).to.include('The authorization token is required');
        expect(response.statusCode).toBe(400);
      });
  });

  it('Buy album with invalid albumId', () => {
    const { albumId } = mockUserAlbumInvalid;
    request
      .post(`/albums/${albumId}`)
      .set(authorizationToken)
      .send(mockUserAlbumInvalid)
      .then(getAlbums(albumId))
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe(`The album with id ${albumId} doesn't exists`);
      });
  });
});
