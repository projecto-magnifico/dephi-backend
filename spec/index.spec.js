const {expect} = require("chai");
const {grabKeywords,decayAllTopics,addKeywordsToThread,addStoriesToThread,topicThreadIntersection,processTopicAndThread,getNewScore} = require("../threadAnalysis.js")

// describe("grabKeywords" ,() => {
//     it("is a function" , () => {
//         // expect(formatKeySet).to.be.a("function");
//     })
//     it("returns an array of the same length" , () => {
//         expect(formatKeySet(arr1).length).to.equal(7);
//         expect(formatKeySet(arr2).length).to.equal(arr2.length);
//     })
//     it("returns the correct element in the result" , () => {
//         expect(formatKeySet(arr1)[0]).to.equal("melania trump");
//     })  
// })
