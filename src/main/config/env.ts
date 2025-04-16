export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/clean-ts',
  mongoTestsUrl:
    process.env.MONGO_TESTS_URL || 'mongodb://127.0.0.1:27017/clean-ts-tests',
  port: process.env.PORT || 8080,
};
