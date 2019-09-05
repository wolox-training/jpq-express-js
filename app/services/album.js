const requestPromise = require('request-promise');
const { endpointJsonPlaceholder } = require('../../config').common.externalApi;
const { externalError } = require('../errors');

const getAlmbums = () =>
  requestPromise(`${endpointJsonPlaceholder}/albums`).catch(error => {
    throw externalError(error.message);
  });

const getPhotosByUser = userId =>
  requestPromise(`${endpointJsonPlaceholder}/albums/${userId}/photos`).catch(error => {
    throw externalError(error.message);
  });

module.exports = {
  getAlmbums,
  getPhotosByUser
};
