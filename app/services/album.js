const requestPromise = require('request-promise');
const { endpointJsonPlaceholder } = require('../../config').common.externalApi;
const { externalError } = require('../errors');

const getAlmbums = () => {
  const promiseAlbums = requestPromise(`${endpointJsonPlaceholder}/albums`).catch(error => {
    throw externalError(error.message);
  });
  return promiseAlbums;
};

const getPhotosByUser = userId => {
  const promisePhotos = requestPromise(`${endpointJsonPlaceholder}/albums/${userId}/photos`).catch(error => {
    throw externalError(error.message);
  });
  return promisePhotos;
};

module.exports = {
  getAlmbums,
  getPhotosByUser
};
