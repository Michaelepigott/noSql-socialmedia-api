const { connect, connection } = require('mongoose');
//get connection, runs on local host
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social_DB';

connect(connectionString);

module.exports = connection;