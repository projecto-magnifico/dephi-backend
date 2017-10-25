const env = process.env.NODE_ENV || 'devs';
module.exports = require(`./${env}.config`);