const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.EXTERNAL_ERROR = 'external_error';
exports.externalError = message => internalError(message, exports.EXTERNAL_ERROR);

exports.VALIDATION_USER_ERROR = 'validation_user_error';
exports.validationUserError = message => internalError(message, exports.VALIDATION_USER_ERROR);

exports.TOKEN_ERROR = 'token_error';
exports.tokenError = message => internalError(message, exports.TOKEN_ERROR);
