const requestPromise = require('request-promise');
const { endpointJsonPlaceholder } = require('../../config').common.externalApi;

const getAlmbums = () => requestPromise(`${endpointJsonPlaceholder}/albums`);

const getPhotosByUser = userId => requestPromise(`${endpointJsonPlaceholder}/albums/${userId}/photos`);

module.exports = {
  getAlmbums,
  getPhotosByUser
};
