'use strict';

const supertest = require('supertest');
const app = require('../app');
const {
  mockUser,
  mockUserWrongPassword,
  mockUserMissingParams,
  authorizationToken,
  mockUserAdmin
} = require('./mocks/user');
const { validationUserError, tokenError } = require('../app/errors');
const { User } = require('../app/models');
const { invalidateAllSessions } = require('../app/services/expirationToken');
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

  it('GET /users without authorization token', () => {
    request.get('/users').then(response => {
      expect(response.body).to.include(tokenError);
      expect(response.statusCode).toBe(400);
    });
  });

  it('GET /users with authorization token', () => {
    request
      .get('/users')
      .set(authorizationToken)
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });

  it('GET /users with authorization token expired', () => {
    request
      .get('/users')
      .set(authorizationToken)
      .then(invalidateAllSessions())
      .then(response => {
        expect(response.body).to.include(validationUserError);
        expect(response.body.message).to.include('The token was expired');
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

describe('Test /admin/users', () => {
  it('request without token', () => {
    request
      .post('/admin/users')
      .send(mockUserAdmin)
      .then(response => {
        expect(response.body).to.include(validationUserError);
        expect(response.body.message).to.include('The authorization token is required');
        expect(response.statusCode).toBe(400);
      });
  });

  it('request with valid token', () => {
    request
      .post('/admin/users')
      .set(authorizationToken)
      .send(mockUserAdmin)
      .then(response => {
        expect(response.body.message).to.include(
          `The user ${mockUserAdmin.name} ${mockUserAdmin.lastName} now is admin`
        );
        expect(response.statusCode).toBe(200);
      });
  });
});

describe('Expiration token', () => {
  it('Request authorization token', () => {
    request
      .post('/users/sessions')
      .send(mockUserAdmin)
      .then(response => {
        expect(response.body).to.include(createToken(mockUser));
        expect(response.statusCode).toBe(200);
      });
  });

  it('GET /users authorization token with expedation date invalid', () => {
    request
      .get('/users')
      .set(authorizationToken)
      .then(response => {
        expect(response.body.message).toBe('The token was expired');
        expect(response.statusCode).toBe(400);
      });
  });
});
