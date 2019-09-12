const albumService = require('../services/album');
const { create, getAlbumsIdsByUser } = require('../services/usersAlbum');
const { formatResponseAlbums, formatResponsePhotos } = require('../helpers/formats');
const { getPhotos } = require('../services/photos');

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

const getPhotosOfBuyedAlbums = async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;

  if (!id) next('The userId is a required param');

  const photos = await getPhotos();

  const albumIds = await getAlbumsIdsByUser(user.sub);

  const photosByUser = photos.filter(photo => albumIds.includes(photo.albumId));

  res.send(formatResponsePhotos(photosByUser));
};

module.exports = {
  getAlmbums,
  getPhotosByUser,
  buyAlbumRequest,
  getBuyedAlbums,
  getPhotosOfBuyedAlbums
};
