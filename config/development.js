exports.config = {
  environment: 'development',
  common: {
    database: {
      name: process.env.DB_NAME_DEV
    },
    httpErrors: {
      ok: 200,
      internalServerError: 500
    }
  },
  isDevelopment: true
};
