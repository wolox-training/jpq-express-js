const requestPromise = require('request-promise');
const { endpointJsonPlaceholder } = require('../../config').common.externalApi;
const { externalError } = require('../errors');

const getAlmbums = id => {
  const url = id ? `${endpointJsonPlaceholder}/albums/${id}` : `${endpointJsonPlaceholder}/albums`;
  return requestPromise(url).catch(error => {
    const message = error.statusCode === 404 ? `The album with id ${id} doesn't exists` : error.message;
    throw externalError(message);
  });
};

const getPhotosByUser = userId =>
  requestPromise(`${endpointJsonPlaceholder}/albums/${userId}/photos`).catch(error => {
    throw externalError(error.message);
  });

module.exports = {
  getAlmbums,
  getPhotosByUser
};
