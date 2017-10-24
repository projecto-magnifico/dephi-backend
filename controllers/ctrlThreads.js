const db = require('../data');

const getThreads = (req, res) => {
    db.manyOrNone('SELECT * FROM threads')
        .then(rows => {
            res.send(rows)
        })
        .catch(err => res.send(err));        
}

const insertNewThread = (req, res) => {
    db.one('INSERT INTO threads (score) VALUES ($1) returning *', req.body.score)
        .then(row => {
            res.status(201).send(row)
        })
        .catch(err => res.send(err));  
}

const getThreadById = (req, res) => {
    let id = req.params.id;
    db.one('SELECT * FROM threads WHERE thread_id = $1', id)
        .then(row => {
            res.send(row)
        })
        .catch(err => res.send(err));    
}

module.exports = { getThreads, getThreadById, insertNewThread };