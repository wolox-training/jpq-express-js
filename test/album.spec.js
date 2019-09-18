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

describe('Test /users/:id/albums', () => {
  it('Get buyed albums admin user', () => {
    const { userId } = mockUserAlbum;
    request
      .post(`/users/${userId}/albums`)
      .set(authorizationToken)
      .then(async response => {
        expect(response.statusCode).toBe(200);
        expect(await getAlbums()).tobe(response.body);
      });
  });

  it('Get buyed albums regular user', () => {
    const { userId } = mockUserAlbum;
    request
      .post(`/users/${userId}/albums`)
      .set(authorizationToken)
      .then(async response => {
        expect(response.statusCode).toBe(200);
        expect(await getAlbums(userId)).tobe(response.body);
      });
  });

  it('Get buyed albums without authorization token', () => {
    const { userId } = mockUserAlbum;
    request.post(`/users/${userId}/albums`).then(response => {
      expect(response.body).to.include(validationUserError);
      expect(response.body.message).to.include('The authorization token is required');
      expect(response.statusCode).toBe(400);
    });
  });
});
