const { connect } = require('./database/mongo');
const config = require('./utils/config');
const logger = require('./utils/logger');
const app = require('./app');

connect();

const PORT = config.PORT;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
