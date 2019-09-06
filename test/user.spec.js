'use strict';

const supertest = require('supertest');
const app = require('../app');
const { mockUser, mockUserWrongPassword, mockUserMissingParams } = require('./mocks/user');
const { validationUserError } = require('../app/errors');

const request = supertest(app);

describe('Test /users', () => {
  it('created user with correct params', () => {
    request
      .post('/users')
      .send(mockUser)
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });

  it('created user with a email existing', () => {
    request
      .post('/users')
      .send(mockUser)
      .then(response => {
        expect(response.body).to.include(validationUserError);
        expect(response.body.message).to.include(`The email ${mockUser.email} already exists`);
        expect(response.statusCode).toBe(500);
      });
  });

  it('created user with a wrong password', () => {
    request
      .post('/users')
      .send(mockUserWrongPassword)
      .then(response => {
        expect(response.body).to.include(validationUserError);
        expect(response.body.message).to.include('Password should be at least 8 chars long');
        expect(response.statusCode).toBe(500);
      });
  });

  it('created user with a missing params', () => {
    request
      .post('/users')
      .send(mockUserMissingParams)
      .then(response => {
        expect(response.body).to.include(validationUserError);
        expect(response.body.message).to.include(
          'Errors: password is a required field,name is a required field'
        );
        expect(response.statusCode).toBe(500);
      });
  });
});
