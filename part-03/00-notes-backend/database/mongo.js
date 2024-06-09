const mongoose = require('mongoose');
const logger = require('../utils/logger');
const { MONGO_DB_URI } = require('../utils/config');

mongoose.set('strictQuery', false);

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGO_DB_URI);
    logger.info('Connected to MongoDB');
  } catch (e) {
    logger.info('Error connecting to mongo...', e);
  }
};

module.exports = connectToDB;
