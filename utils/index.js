const {
    arrSieve,
    decimalToBinary,
    zeroFiller,
    getSets
} = require('../helpers');

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
    return keywordSets;
}

const formulateInsertionSchema = (keywordSets) => {
    let insertionSchema = [];
    keywordSets.forEach((topicKeywords,i) => {
        threadTextAndId2.forEach((threadKeywords) => {
            let topicKeywordsText = _.pluck(topicKeywords,'text');
            let threadKeywordsText = _.pluck(threadKeywords,'text');
            let intersection = _.intersection(topicKeywordsText,threadKeywordsText);
            if (intersection.length > 3) {
                insertionSchema.push([i , threadKeywords[0].id]);
            }
        });
    });
}

module.exports = { getKeywordSets };