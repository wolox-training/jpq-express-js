exports.config = {
  environment: 'testing',
  isTesting: true,
  common: {
    database: {
      name: process.env.DB_NAME_TEST
    },
    httpErrors: {
      ok: 200,
      internalServerError: 500
    },
    session: {
      secret: 'some-super-secret'
    }
  }
};
