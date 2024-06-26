const config = require('../utils/config');
const logger = require('../utils/logger');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

logger.info('connecting to MongoDB...');

function connect() {
  mongoose
    .connect(config.MONGODB_URI)
    .then(() => logger.info('connected to MongoDB'))
    .catch((error) =>
      logger.error('error connecting to MongoDB:', error.message)
    );
}

module.exports = { connect };
