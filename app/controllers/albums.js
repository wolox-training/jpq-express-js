const albumService = require('../services/album');
const { create, getAlbumsIdsByUser } = require('../services/usersAlbum');
const { formatResponseAlbums } = require('../helpers/formats');

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

const getBuyedAlbums = async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;

  if (!id) next('The userId is a required param');

  const allAlbums = await albumService.getAlmbums();

  if (user.isAdmin) res.send(formatResponseAlbums(allAlbums));

  const albumIds = await getAlbumsIdsByUser(user.sub);

  const albumsByUser = allAlbums.filter(album => albumIds.includes(album.id));

  res.send(formatResponseAlbums(albumsByUser));
};

module.exports = {
  getAlmbums,
  getPhotosByUser,
  buyAlbumRequest,
  getBuyedAlbums
};
