const { User } = require('../models');

const signUp = user => {
  User.create(user)
    .then(result => console.log(result))
    .catch(error => console.log(error.message));
};

module.exports = {
  signUp
};
