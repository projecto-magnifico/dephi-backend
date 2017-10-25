const db = require('../data');

const getKeywordsByThreadId = (req, res) => {
    let id = req.params.id;  
    db.many('SELECT * FROM keywords WHERE thread_id = $1', id)
        .then(rows => {
            res.send(rows);
        })
        .catch(err => res.send(err));  
};

const insertKeywordWithThreadId = (req, res) => {
    let id = req.params.id;
    db.one('INSERT INTO keywords (thread_id, word, strength) VALUES ($1, $2, $3) returning *', [id, req.body.word, req.body.strength])
        .then(row => {
            res.status(201).send(row);
        })
        .catch(err => res.send(err));
};

const updateKeywordWithThreadId = (req, res) => {
    let id = req.params.id;
    db.one('UPDATE keywords SET strength = strength * $1 WHERE thread_id = $2 AND word = $3 returning *', [req.body.boost, id, req.body.word])    
        .then(row => {
            res.status(202).send(row);
        })
        .catch(err => res.send(err));
};

module.exports = { getKeywordsByThreadId, insertKeywordWithThreadId, updateKeywordWithThreadId};