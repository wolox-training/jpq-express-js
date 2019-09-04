const { healthCheck } = require('./controllers/healthCheck');
const { getAlmbums, getPhotosByUser } = require('./controllers/albums');
const { signUpRequest } = require('./controllers/users');
const { validateUser } = require('./middlewares/validateUser');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/albums', getAlmbums);
  app.get('/albums/:id/photos', getPhotosByUser);
  app.post('/users', validateUser, signUpRequest);
};
