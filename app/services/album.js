const requestPromise = require('request-promise');
const { endpointJsonPlaceholder } = require('../../config').common.externalApi;
const { externalError } = require('../errors');

const getAlmbums = async () => {
  try {
    return await requestPromise(`${endpointJsonPlaceholder}/albums`);
  } catch (error) {
    return externalError(error.message);
  }
};

const getPhotosByUser = async userId => {
  try {
    return await requestPromise(`${endpointJsonPlaceholder}/albums/${userId}/photos`);
  } catch (error) {
    return externalError(error.message);
  }
};

module.exports = {
  getAlmbums,
  getPhotosByUser
};
