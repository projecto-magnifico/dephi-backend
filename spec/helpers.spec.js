const {expect} = require('chai');

const {concatArrays, getStringSimilarity, createEmptyGraph, filterGraphOrphans} = require('../helpers');

describe('concatArrays', () => {
    it('concatenates two array', () => {
        expect(concatArrays([1],[2])).to.eql([1, 2]);
    })
})

describe('getStringSimilarity', () => {
    it('compares two strings', () => {
        expect(getStringSimilarity('a','a')).to.equal(1);
        expect(getStringSimilarity('a','b')).to.equal(0);
        expect(getStringSimilarity('aba','baa')).to.equal(0.5);                
    })
})

describe('createEmptyGraph', () => {
    it('creates an empty indexed graph object', () => {
        expect(createEmptyGraph(1)).to.eql({0: []});
    })
})

describe('filterGraphOrphans', () => {
    it('removes any object key that has an empty array value', () => {
        expect(filterGraphOrphans({
            '0' : ['a'],
            '1' : []
        })).to.eql({0: ['a']});
        expect(filterGraphOrphans({
            '1' : ['a'],
            '0' : []
        })).to.eql({1: ['a']});
    })
})