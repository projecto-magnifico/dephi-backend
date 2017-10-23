const { expect } = require('chai');
const fs = require('fs');
const path = require('path');

const {mapArticles, graphArticleLinks, groupArticles} = require('../utils/createTopics');
const {getStringSimilarity} = require('../helpers');

describe('post-API call untility & processing functions', () => {
    const testJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'test_data.json')).toString());

    describe('mapArticles', () => {
        it('returns an array of article objects', () => {
            expect(mapArticles([testJson])).to.be.an('array');
            expect(mapArticles([testJson])[0]).to.be.an('object');
        })
        it('returns the number of articles in the JSON files combined', () => {
            expect(mapArticles([testJson]).length).to.equal(10);
            expect(mapArticles([testJson].concat([testJson])).length).to.equal(20);
        })
        it('returns articles with the correct code property', () => {
            expect(mapArticles([testJson])[0].code).to.equal('0');
            expect(mapArticles([testJson].concat([testJson]))[10].code).to.equal('10');
        })
        it('returns articles with the correct source property', () => {
            expect(mapArticles([testJson])[0].source).to.equal('bbc-news');
        })
        it('returns articles with the correct score property', () => {
            expect(mapArticles([testJson])[0].score).to.equal(10);
            expect(mapArticles([testJson])[9].score).to.equal(1);        
        })
        it('returns articles with the correct age property', () => {
            expect(mapArticles([testJson])[0].age).to.equal(0);
        })
    })

    const mappedArticles = mapArticles([testJson].concat([testJson]));
    const mappedArticlesV2 = mappedArticles.slice(0, 15);
    describe('graphArticles', () => {
        it('returns a graph object with indexed array properties', () => {
            expect(graphArticleLinks(mappedArticles)).to.be.an('object');
            expect(graphArticleLinks(mappedArticles)['0']).to.be.an('array');
        })
        it('returns an object with the correct number of keys', () => {
            expect(graphArticleLinks(mappedArticles)[19]).to.be.an('array');
            expect(graphArticleLinks(mappedArticles)[20]).to.be.undefined;            
        })
        it('links similar (in this test case, identical) stories via headline', () => {
            expect(graphArticleLinks(mappedArticles)[19]).to.eql(['9']);            
        })
        it('filters out orphan codes - those without any links in their array', () => {
            expect(Object.keys(graphArticleLinks(mappedArticlesV2)).length).to.eql(10);
            expect(graphArticleLinks(mappedArticlesV2)[9]).to.be.undefined;            
        })
    })
    // const groupArticles = (graph, articles, queue, collections = {1: []}, iteration = 1, visited = [])
    const articleGraph = graphArticleLinks(mappedArticles);
    const group = groupArticles(articleGraph, mappedArticles, [0]);    
    describe('groupArticles', () => {
        it('returns an object with indexed arrays', () => {
            expect(group).to.be.an('object');
            expect(group['1']).to.be.an('array');
        })
        it('returns the correct number of indexes', () => {
            expect(Object.keys(group).length).to.equal(10);
            expect(group['11']).to.be.undefined;
        })
        it('contains the necessary information in each group', () => {
            expect(group['1'][0].description).to.equal(group['1'][1].description);
            expect(group['1'][0].code).to.not.equal(group['1'][1].code);            
        })
    })
})

