const pgp = require('pg-promise')({promiseLib: Promise});
const config = require('../config');

module.exports = pgp(config.db);