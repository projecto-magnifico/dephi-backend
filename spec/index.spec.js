const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../index');
const request = supertest(app);
NODE_ENV = 'test';

const { getKeywordSets, formulateInsertionSchema } = require('../utils');
const { threadTextAndId2 } = require('../spec/threadData2');
const { topicKeywords, keywordSets } = require('../spec/formattedTestData');


describe('getKeywordSets', () => {
    it('converts an array of arrays into larger array of power set arrays', () => {
        expect(getKeywordSets(topicKeywords)).to.eql(keywordSets);
    });
});

describe('formulateInsertionSchema', () => {
    it('converts an array of arrays into', () => {
        expect(formulateInsertionSchema(keywordSets, threadTextAndId2)).to.eql([]);
    });
});


describe('getThreads', () => {
    let response;
    before(() => {
        return request
        .get('/threads')
        .then(res => response = res);
    });

    it('responds with 200 statusCode', () => {
        expect(response.statusCode).to.equal(200);
    });

    it('returns an array of threads', () => {
        expect(Array.isArray(response.body)).to.be.true;
        expect(response.body.length).to.equal(5);
    });
});

describe('insertNewThread', () => {
    let response;
    const newThread = {"score" : 13};    
    before(() => {
        return request
        .post('/threads')
        .send(newThread)
        .then(res => response = res);
    });
    it('responds with 201 statusCode', () => {
        expect(response.statusCode).to.equal(201);
    });
    it('returns the inserted keyword', () => {
        console.log(response.body);
        expect(response.body.score).to.equal('13');
    });
})

describe('getThreadById', () => {
    let response;
    before(() => {
        return request
        .get('/threads/1')
        .then(res => response = res);
    });

    it('responds with 200 statusCode', () => {
        expect(response.statusCode).to.equal(200);
    });

    it('returns one thread', () => {
        expect(typeof response.body).to.equal('object');
        expect(response.body).to.eql({ thread_id: 1, score: '10' });
    });
});

describe('getThreadKeywords', () => {
    let response;
    before(() => {
        return request
        .get('/threads/1/keywords')
        .then(res => response = res);
    });

    it('responds with 200 statusCode', () => {
        expect(response.statusCode).to.equal(200);
    });

    it('returns one thread', () => {
        expect(Array.isArray(response.body)).to.be.true;
        expect(response.body.length).to.eql(2);
    });
});

describe('insertKeywordWithThreadId', () => {
    let response;
    const newKeyword = {"word" : "pain", "strength" : 1.3};    
    before(() => {
        return request
        .post('/threads/1/keywords')
        .send(newKeyword)
        .then(res => response = res);
    });
    it('responds with 201 statusCode', () => {
        expect(response.statusCode).to.equal(201);
    });
    it('returns the inserted keyword', () => {
        expect(response.body.word).to.equal('pain');
    });
});

describe('updateThreadKeywords', () => {
    let response;
    const keywordUpdate = {"word" : "cork", "boost" : 1.3};    
    before(() => {
        return request
        .patch('/threads/3/keywords')
        .send(keywordUpdate)
        .then(res => response = res);
    });
    it('responds with 202 statusCode', () => {
        expect(response.statusCode).to.equal(202);
    });
    it('returns the inserted keyword', () => {
        //Don't worry, it's still a number in SQL!
        expect(response.body.strength).to.equal('2.34');
    });
});

describe('getArticlesByThreadId', () => {
    let response;
    before(() => {
        return request
        .get('/threads/1/articles')
        .then(res => response = res);
    });

    it('responds with 200 statusCode', () => {
        expect(response.statusCode).to.equal(200);
    });

    it('returns an array of articles', () => {
        expect(Array.isArray(response.body)).to.be.true;
        expect(response.body.length).to.equal(2);
    });
});

describe('resetArticleByThreadIdAndUrl', () => {
    describe('correct input', () => {
        let response;
        before(() => {
            return request
            .patch('/threads/1/articles')
            .send({"url" : "url innit 2"})
            .then(res => response = res);
        });
    
        it('responds with 202 statusCode', () => {
            expect(response.statusCode).to.equal(202);
        });
    
        it('returns one article with age = 0', () => {
            expect(typeof response.body).to.equal('object');
            expect(response.body.age).to.equal(0);
        });
    });

    describe('incorrect input', () => {
        let response;
        before(() => {
            return request
            .patch('/threads/1/articles')
            .send({"url" : "url innit 3"})
            .then(res => response = res);
        });
    
        it('responds with 404 statusCode', () => {
            expect(response.statusCode).to.equal(404);
        });
    
        it('returns a message describing incorrect input', () => {
            expect(response.body.message).to.equal('No data returned from the query.');
        });
    });    
});

describe('insertArticleWithThreadId', () => {
    let response;
    const newArticle = {
        "headline" : "cork mystery continues",
        "description" : "cork surprises all",
        "url" : "wotta url",
        "age" : 0,
        "source_id" : 2
    };    
    before(() => {
        return request
        .post('/threads/3/articles')
        .send(newArticle)
        .then(res => response = res);
    });
    it('responds with 201 statusCode', () => {
        expect(response.statusCode).to.equal(201);
    });
    it('returns the inserted article', () => {
        expect(response.body.age).to.equal(0);
        expect(response.body.description).to.equal('cork surprises all');
    });
});
