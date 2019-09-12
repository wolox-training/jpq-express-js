const { checkSchema } = require('express-validator');

const { healthCheck } = require('./controllers/healthCheck');
const { getAlmbums, getPhotosByUser } = require('./controllers/albums');
const { signUpRequest, signInRequest, getUsersRequest } = require('./controllers/users');
const { validateUser, userIsAuth } = require('./middlewares/validateUser');
const { validateSignIn } = require('./middlewares/validateSignIn');
const { userSchema, userSignInSchema } = require('./validator/userSchema');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/albums', getAlmbums);
  app.get('/albums/:id/photos', getPhotosByUser);
  app.post('/users', checkSchema(userSchema), validateUser, signUpRequest);
  app.get('/users', userIsAuth, getUsersRequest);
  app.post('/users/sessions', checkSchema(userSignInSchema), validateSignIn, signInRequest);
};
