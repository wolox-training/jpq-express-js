const albumService = require('../services/album');
const { create } = require('../services/usersAlbum');

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

const buyAlbumRequest = async (req, res, next) => {
  const { id } = req.params;
  const { user } = req.user;

  try {
    const album = await albumService.getAlmbums(id);

    await create(user.userId, album.id);

    res.send(`The album ${album.title} was buyed by user ${user.email}`);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAlmbums,
  getPhotosByUser,
  buyAlbumRequest
};
