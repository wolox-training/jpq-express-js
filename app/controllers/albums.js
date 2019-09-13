const albumService = require('../services/album');
const { create } = require('../services/usersAlbum');

const getAlbums = (_, res, next) => {
  albumService
    .getAlbums()
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
  const { user } = req;

  try {
    const album = await albumService.getAlbums(id);

    await create(user.userId, album.id);

    res.send(`The album ${album.title} was bought by user ${user.email}`);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAlbums,
  getPhotosByUser,
  buyAlbumRequest
};
