const {expect} = require("chai");
const {formatKeySet,filterNews,getIntersection,arr1,arr2,tues,weds} = require("../relevance")


describe("formatKeySet" ,() => {
    it("is a function" , () => {
        expect(formatKeySet).to.be.a("function");
    })
    it("returns an array of the same length" , () => {
        expect(formatKeySet(arr1).length).to.equal(7);
        expect(formatKeySet(arr2).length).to.equal(arr2.length);
    })
    it("returns the correct element in the result" , () => {
        expect(formatKeySet(arr1)[0]).to.equal("melania trump");
    })
    
})
describe("getIntersection" ,() => {
    it("is a function" , () => {
        expect(getIntersection).to.be.a("function");
    })
    it("returns an array" , () => {
        expect(getIntersection(tues,weds)).to.be.an("array");
        expect(getIntersection(arr1,arr2)).to.be.an("array");
        expect(getIntersection(tues,weds)[0]).to.be.a("string");
    })
})