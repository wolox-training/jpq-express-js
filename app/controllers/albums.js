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

  try {
    const album = await albumService.getAlmbums(id);

    const albumJson = JSON.parse(album);

    await create(req.user.sub, albumJson.id);

    res.send(`The album ${albumJson.title} was buyed by user ${req.user.email}`);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAlmbums,
  getPhotosByUser,
  buyAlbumRequest
};
