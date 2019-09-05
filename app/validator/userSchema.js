const { regExpEmail, regExpPassword } = require('../helpers/constants');

const userSchema = {
  email: {
    in: ['body'],
    isEmail: {
      errorMessage: 'email is a invalid field'
    },
    isEmpty: {
      errorMessage: 'email is a required field',
      negated: true
    },
    matches: {
      options: [regExpEmail],
      errorMessage: 'The email domain is incorrect'
    }
  },
  password: {
    in: ['body'],
    isLength: {
      errorMessage: 'Password should be at least 8 chars long',
      options: { min: 8 }
    },
    isEmpty: {
      errorMessage: 'password is a required field',
      negated: true
    },
    matches: {
      options: [regExpPassword],
      errorMessage: 'The password must be alphanumeric'
    }
  },
  name: {
    in: ['body'],
    isEmpty: {
      errorMessage: 'name is a required field',
      negated: true
    }
  },
  lastName: {
    in: ['body'],
    isEmpty: {
      errorMessage: 'lastName is a required field',
      negated: true
    }
  }
};

module.exports = {
  userSchema
};
