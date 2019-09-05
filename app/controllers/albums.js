const albumService = require('../services/album');

const getAlmbums = (_, res, next) => {
  albumService
    .getAlmbums()
    .then(albums => res.send(albums))
    .catch(error => next(error));
};

const getPhotosByUser = (req, res, next) => {
  albumService
    .getPhotosByUser(req.params.id)
    .then(photos => res.send(photos))
    .catch(error => next(error));
};

module.exports = {
  getAlmbums,
  getPhotosByUser
};
