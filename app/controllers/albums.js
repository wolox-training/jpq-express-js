const albumService = require('../services/album');
const { create, getAlbumsIdsByUser } = require('../services/usersAlbum');
const { formatResponseAlbums } = require('../helpers/formats');

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

const getBoughtAlbums = async (req, res) => {
  const { user } = req;

  const allAlbums = await albumService.getAlbums();

  if (user.isAdmin) return res.send(formatResponseAlbums(allAlbums));

  const albumIds = await getAlbumsIdsByUser(user.sub);

  const albumsByUser = allAlbums.filter(album => albumIds.includes(album.id));

  return res.send(formatResponseAlbums(albumsByUser));
};

module.exports = {
  getAlbums,
  getPhotosByUser,
  buyAlbumRequest,
  getBoughtAlbums
};
