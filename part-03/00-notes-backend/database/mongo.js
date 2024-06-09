const mongoose = require('mongoose');

const MONGO_DB_URI = process.env.MONGO_DB_URI;

mongoose.set('strictQuery', false);

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGO_DB_URI);
    console.log('Connected to MongoDB');
  } catch (e) {
    console.log('Error connecting to mongo...', e);
  }
};

module.exports = connectToDB;
