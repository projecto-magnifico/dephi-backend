const _ = require('underscore');

const { getSets } = require('../helpers');

const getKeywordSets = (topicsKeywords) => {
    const keywordSets = topicsKeywords.map(topicKeywords => {
        const keywordsRelevanceArray = topicKeywords.map(topicKeyword => {
            let topicKeywordArray = getSets(topicKeyword.text);
            const splitKeywordsWithRelevance = topicKeywordArray.map(topicKeywordWord => {
                return {
                    text : topicKeywordWord,
                    relevance : topicKeywordWord === topicKeyword.text ? topicKeyword.relevance : topicKeyword.relevance / 2
                };
            });
            return splitKeywordsWithRelevance;
        });
        return _.flatten(keywordsRelevanceArray);
    });
    // console.log(keywordSets);
    return keywordSets;
};

const formulateInsertionSchema = ( topicKeywordSets, threadKeywordSets ) => {
    let insertionSchema = [];
    topicKeywordSets.forEach((topicKeywords,i) => {
        threadKeywordSets.forEach((threadKeywords) => {
            let topicKeywordsText = _.pluck(topicKeywords,'text');
            let threadKeywordsText = _.pluck(threadKeywords,'text');
            let intersection = _.intersection(topicKeywordsText,threadKeywordsText);
            if (intersection.length > 3) {
                insertionSchema.push([i , threadKeywords[0].id]);
            }
        });
    });
};

module.exports = { getKeywordSets, formulateInsertionSchema };