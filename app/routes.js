const { checkSchema } = require('express-validator');

const { healthCheck } = require('./controllers/healthCheck');
const { getAlmbums, getPhotosByUser, buyAlbumRequest } = require('./controllers/albums');
const { signUpRequest, signInRequest, getUsersRequest, userAdminRequest } = require('./controllers/users');
const { validateUser, userIsAuth, validateAdminUser } = require('./middlewares/validateUser');
const { validateSignIn } = require('./middlewares/validateSignIn');
const { userSchema, userSignInSchema } = require('./validator/userSchema');
const { expressValidator } = require('./middlewares/expressValidator');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/albums', getAlmbums);
  app.post('/albums/:id', userIsAuth, buyAlbumRequest);
  app.get('/albums/:id/photos', getPhotosByUser);
  app.post('/users', checkSchema(userSchema), expressValidator, validateUser, signUpRequest);
  app.get('/users', userIsAuth, getUsersRequest);
  app.post('/users/sessions', checkSchema(userSignInSchema), expressValidator, validateSignIn, signInRequest);
  app.post(
    '/admin/users',
    userIsAuth,
    checkSchema(userSchema),
    expressValidator,
    validateAdminUser,
    userAdminRequest
  );
};
