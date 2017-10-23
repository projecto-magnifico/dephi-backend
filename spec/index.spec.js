NODE_ENV = 'test';
const {expect} = require('chai');
const supertest = require('supertest');
const app = require('../index');
const request = supertest(app);

describe('Get Thread', () => {
    let response;
    before(() => {
        return request
        .get('/threads')
        .then(res => response = res);
    });

    it('responds with 200 statusCode', () => {
        expect(response.statusCode).to.equal(200);
    });
});
