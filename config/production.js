exports.config = {
  environment: 'production',
  common: {
    database: {
      name: process.env.DB_NAME
    },
    httpErrors: {
      ok: 200,
      internalServerError: 500
    }
  },
  isProduction: true
};
