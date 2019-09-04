const requestPromise = require('request-promise');
const { defaultError } = require('../errors');

const url = 'https://jsonplaceholder.typicode.com';

const getAlmbums = async () => {
  try {
    return await requestPromise(`${url}/albums`);
  } catch (error) {
    throw defaultError(error.message);
  }
};

const getPhotosByUser = async userId => {
  try {
    return await requestPromise(`${url}/albums/${userId}/photos`);
  } catch (error) {
    throw defaultError(error.message);
  }
};

module.exports = {
  getAlmbums,
  getPhotosByUser
};
