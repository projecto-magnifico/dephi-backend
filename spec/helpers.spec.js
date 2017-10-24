const expect = require('chai').expect;
const {
    decimalToBinary,
    getSets,
    arrSieve
} = require('../helpers');

describe('powerSet', function () {
    describe('arrSieve', function () {
        it('is a function', function () {
            expect(arrSieve).to.be.a('function');
        });
        it('it returns an array', function () {
            expect(typeof arrSieve(['a', 'b', 'c'], [1, 0, 1])).to.be.a('string');
        });
        it('it returns a empty array when passed a single array of [0]', function () {
            expect(arrSieve(['a'], [0])).to.eql([]);
        });
        it('it returns a array with one element when passed a single array of [1]', function () {
            expect(arrSieve(['a'], [1])).to.eql(['a']);
        });
        it('it returns an array with no gaps for an array of just ones', function () {
            expect(arrSieve(['a', 'b', 'c'], [1, 1, 1])).to.eql(['a', 'b', 'c']);
        });
        it('it returns an array with no gaps for an appropriate binary array', function () {
            expect(arrSieve(['a', 'b', 'c'], [1, 0, 1])).to.eql(['a', 'c']);
            expect(arrSieve(['a', 'b', 'c'], [0, 0, 1])).to.eql(['c']);
            expect(arrSieve(['a', 'b', 'c'], [0, 1, 1])).to.eql(['b', 'c']);
            expect(arrSieve(['a', 'b', 'c'], [0, 1, 0])).to.eql(['b']);
        });
    });
    describe('decimalToBinary', function () {
        it('powerSet is a function', function () {
            expect(decimalToBinary).to.be.a('function');
        });
        it('for an input of zero should return 0', function () {
            expect(decimalToBinary(0)).to.eql([0]);
        });
        it('for an input of one should return 1', function () {
            expect(decimalToBinary(1)).to.eql([1]);
        });
        it('for an input of 3 should return 11', function () {
            expect(decimalToBinary(3)).to.eql([1, 1]);
        });
        it('for an input of 3 should return 11', function () {
            expect(decimalToBinary(4)).to.eql([1, 0, 0]);
        });
        it('returns a binary array for random numbers', function () {
            expect(decimalToBinary(63)).to.eql([1, 1, 1, 1, 1, 1]);
            expect(decimalToBinary(59)).to.eql([1, 1, 1, 0, 1, 1]);
            expect(decimalToBinary(64)).to.eql([1, 0, 0, 0, 0, 0, 0]);
            expect(decimalToBinary(100)).to.eql([1, 1, 0, 0, 1, 0, 0]);
            expect(decimalToBinary(5)).to.eql([1, 0, 1]);
        });
    });
    describe('getSets', function () {
        it('it is a function', function () {
            expect(getSets).to.be.a('function');
        });
        it('it is a function', function () {
            expect(getSets).to.be.a('function');
        });
        it('it returns 2 to the n elements for an array of n elements', function () {
            expect(getSets('a b c d e f').length).to.equal(64);
        });
        it('it returns a set containing the empty set for an input of an empty set', function () {
            expect(getSets('')).to.eql([
                [],['']
            ]);
        });
    });
});