const express = require('express');
const app = express();
const {getThreads} = require('./controller');
const env = process.env.NODE_ENV || 'devs';

app.use('/threads', getThreads);

module.exports = app;