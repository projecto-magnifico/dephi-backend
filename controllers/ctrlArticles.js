const db = require('../data');

const getArticlesByThreadId = (req, res) => {
    let id = req.params.id;  
    db.many('SELECT * FROM articles WHERE thread_id = $1', id)
        .then(rows => {
            res.send(rows);
        })
        .catch(err => res.send(err));  
};

const resetArticleWithThreadIdAndUrl = (req, res) => {
    let id = req.params.id;      
    db.one('UPDATE articles SET age = 0 WHERE thread_id = $1 AND url = $2 RETURNING *', [id, req.body.url])
        .then(row => {
            res.status(202).send(row);
        })
        .catch(err => res.status(404).send(err));          
};

const insertArticleWithThreadId = (req, res) => {
    let id = req.params.id;
    db.one('INSERT INTO articles (thread_id, headline, description, url, age, source_id) VALUES ($1, $2, $3, $4, $5, $6) returning *', [id, req.body.headline, req.body.description, req.body.url, req.body.age, req.body.source_id])
        .then(row => {
            res.status(201).send(row);
        })
        .catch(err => res.send(err));
};

module.exports = {getArticlesByThreadId, resetArticleWithThreadIdAndUrl, insertArticleWithThreadId};