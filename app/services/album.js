const requestPromise = require('request-promise');
const { endpointJsonPlaceholder } = require('../../config').common.externalApi;
const { externalError } = require('../errors');
const { handleError } = require('../serializers/errorsAlbums');

const getAlbums = id => {
  const url = id ? `${endpointJsonPlaceholder}/albums/${id}` : `${endpointJsonPlaceholder}/albums`;
  return requestPromise(url, { json: true }).catch(error => {
    handleError(error, id);
  });
};

const getPhotosByUser = userId =>
  requestPromise(`${endpointJsonPlaceholder}/albums/${userId}/photos`).catch(error => {
    throw externalError(error.message);
  });

module.exports = {
  getAlbums,
  getPhotosByUser
};
