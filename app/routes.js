const { checkSchema } = require('express-validator');

const { healthCheck } = require('./controllers/healthCheck');
const { getAlmbums, getPhotosByUser } = require('./controllers/albums');
const { signUpRequest, getUsersRequest } = require('./controllers/users');
const { validateUser } = require('./middlewares/validateUser');
const { userSchema } = require('./validator/userSchema');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/albums', getAlmbums);
  app.get('/albums/:id/photos', getPhotosByUser);
  app.post('/users', checkSchema(userSchema), validateUser, signUpRequest);
  app.get('/users', getUsersRequest);
};
