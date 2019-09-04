const albumService = require('../services/album');
const { common } = require('../../config');

const getAlmbums = async (_, res) => {
  try {
    const albums = await albumService.getAlmbums();
    res.status(common.httpErrors.ok).send(albums);
  } catch (error) {
    res.status(common.httpErrors.internalServerError).send(error.message);
  }
};

const getPhotosByUser = async (req, res) => {
  try {
    const photos = await albumService.getPhotosByUser(req.params.id);
    res.status(common.httpErrors.ok).send(photos);
  } catch (error) {
    res.status(common.httpErrors.internalServerError).send(error.message);
  }
};

module.exports = {
  getAlmbums,
  getPhotosByUser
};
