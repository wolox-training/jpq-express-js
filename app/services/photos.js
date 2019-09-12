const requestPromise = require('request-promise');
const { endpointJsonPlaceholder } = require('../../config').common.externalApi;
const { externalError } = require('../errors');

const getPhotos = () =>
  requestPromise(`${endpointJsonPlaceholder}/photos`)
    .then(photos => JSON.parse(photos))
    .catch(error => {
      throw externalError(error.message);
    });

module.exports = {
  getPhotos
};
