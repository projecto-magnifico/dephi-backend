const _ = require('underscore');

const {
    getSets
} = require('./utils');
const topicData = require('./spec/topicData');
const { threadTextAndId2 } = require('./spec/threadData2');



const mergeTopicsWithThreads = (topics) => {
    //topics is an array of full story objects
    const allTopicsKeywords = Object.keys(topics).map(topic => topics[topic].keywords);
    // console.log(allTopicsKeywords)
    //allTopicsKeywords is an array of keyword object arrays
    const keywordSets = allTopicsKeywords.map(topicKeywords => {
        const keywordsRelevanceArray = topicKeywords.map(topicKeyword => {
            // console.log(topicKeyword.text)
            let topicKeywordArray = getSets(topicKeyword.text);
            // console.log(topicKeywordArray)
            const splitKeywordsWithRelevance = topicKeywordArray.map(topicKeywordWord => {
                // console.log(topicKeywordWord)
                return {
                    keyword : topicKeywordWord,
                    relevance : topicKeywordWord === topicKeyword.text ? topicKeyword.relevance : topicKeyword.relevance / 2
                };
            });
            return splitKeywordsWithRelevance;
        });
        return _.flatten(keywordsRelevanceArray);
    });

    let insertionSchema = [];
    keywordSets.forEach((topicKeywords,i) => {

        threadTextAndId2.forEach((threadKeywords) => {

            let topicKeywordsText = _.pluck(topicKeywords,'keyword');
            let threadKeywordsText = _.pluck(threadKeywords,'text');
            let intersection = _.intersection(topicKeywordsText,threadKeywordsText);
            if (intersection.length > 3) {
                insertionSchema.push([i , threadKeywords[0].id]);
            }
        });
    });

    // console.log(insertionSchema);

};

mergeTopicsWithThreads(topicData);