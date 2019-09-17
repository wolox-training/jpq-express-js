const { checkSchema } = require('express-validator');

const { healthCheck } = require('./controllers/healthCheck');
const {
  getAlbums,
  getPhotosByUser,
  buyAlbumRequest,
  getBuyedAlbums,
  getPhotosOfBuyedAlbums
} = require('./controllers/albums');
const {
  signUpRequest,
  signInRequest,
  getUsersRequest,
  userAdminRequest,
  invalidateAllSessionRequest
} = require('./controllers/users');
const { validateUser, userIsAuth, validateAdminUser } = require('./middlewares/validateUser');
const { validateSignIn } = require('./middlewares/validateSignIn');
const { userSchema, userSignInSchema } = require('./validator/userSchema');
const { expressValidator } = require('./middlewares/expressValidator');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/albums', getAlbums);
  app.post('/albums/:id', userIsAuth, buyAlbumRequest);
  app.get('/albums/:id/photos', getPhotosByUser);
  app.get('/users/:id/albums', userIsAuth, getBuyedAlbums);
  app.get('/users/albums/:id/photos', userIsAuth, getPhotosOfBuyedAlbums);
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
  app.post('/users/sessions/invalidate_all', invalidateAllSessionRequest);
};
