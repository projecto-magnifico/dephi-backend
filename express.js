const express = require('express');
const app = express();
const {
    getThreads,
    getThreadById,
    insertNewThread
} = require('./controllers/ctrlThreads');

const {
    getKeywordsByThreadId,
    insertKeywordWithThreadId,
    updateKeywordWithThreadId
} = require('./controllers/ctrlKeywords');

const {
    getArticlesByThreadId,
    resetArticleWithThreadIdAndUrl,
    insertArticleWithThreadId
} = require('./controllers/ctrlArticles');


const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/threads/:id/articles', insertArticleWithThreadId);
app.patch('/threads/:id/articles', resetArticleWithThreadIdAndUrl);
app.get('/threads/:id/articles', getArticlesByThreadId);
app.get('/threads/:id/keywords', getKeywordsByThreadId);
app.post('/threads/:id/keywords', insertKeywordWithThreadId);
app.patch('/threads/:id/keywords', updateKeywordWithThreadId);
app.get('/threads/:id', getThreadById);
app.post('/threads', insertNewThread);
app.get('/threads', getThreads);

// app.get('/articles', getArticles)

module.exports = app;
