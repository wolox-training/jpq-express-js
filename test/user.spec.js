'use strict';

const supertest = require('supertest');
const app = require('../app');
const { mockUser, mockUserWrongPassword, mockUserMissingParams } = require('./mocks/user');
const { validationUserError } = require('../app/errors');
const { User } = require('../app/models');
const { createToken } = require('../app/helpers/jwt');

const request = supertest(app);

describe('Test /users', () => {
  it('created user with correct params', () => {
    const { email } = mockUser;
    request
      .post('/users')
      .send(mockUser)
      .then(async response => {
        expect(response.statusCode).toBe(200);
        expect(await User.findOne({ where: { email } })).toBe(mockUser);
      });
  });

  it('created user with a email existing', () => {
    request
      .post('/users')
      .send(mockUser)
      .then(response => {
        expect(response.body).to.include(validationUserError);
        expect(response.body.message).to.include(`The email ${mockUser.email} already exists`);
        expect(response.statusCode).toBeOneOf([400, 409]);
      });
  });

  it('created user with a wrong password', () => {
    request
      .post('/users')
      .send(mockUserWrongPassword)
      .then(response => {
        expect(response.body).to.include(validationUserError);
        expect(response.body.message).to.include('Password should be at least 8 chars long');
        expect(response.statusCode).toBeOneOf([400, 422]);
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
        expect(response.statusCode).toBe(400);
      });
  });
});

describe('Test /users/sessions', () => {
  it('sign in user with  correct params', () => {
    request
      .post('/users/sessions')
      .send(mockUser)
      .then(response => {
        expect(response.body).to.include({ token: createToken(mockUser) });
        expect(response.statusCode).toBe(200);
      });
  });
});
