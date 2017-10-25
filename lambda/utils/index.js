const _ = require('underscore');

const { getSets } = require('../helpers');

const getKeywordSets = (topicsKeywords) => {
    const keywordSets = topicsKeywords.map(topicKeywords => {
        const keywordsRelevanceArray = topicKeywords.map(topicKeyword => {
            let topicKeywordArray = getSets(topicKeyword.text);
            const splitKeywordsWithRelevance = topicKeywordArray.map(topicKeywordWord => {
                return {
                    text : topicKeywordWord.toLowerCase(),
                    relevance : topicKeywordWord === topicKeyword.text ? topicKeyword.relevance : topicKeyword.relevance / 2
                };
            });
            return splitKeywordsWithRelevance;
        });
        return _.flatten(keywordsRelevanceArray);
    });
    return keywordSets;
};

const formulateInsertionSchema = ( topicKeywordSets, threadKeywordSets ) => {
    let insertionSchema = [];
    topicKeywordSets.forEach((topicKeywords,i) => {
        // console.log(topicKeywordSets)
        threadKeywordSets.forEach((threadKeywords) => {
            let topicKeywordsText = _.pluck(topicKeywords,'text');
            let threadKeywordsText = _.pluck(threadKeywords,'text');
            let intersection = (_.intersection(topicKeywordsText,threadKeywordsText));
            let difference = _.uniq(_.difference(topicKeywordsText,threadKeywordsText));
            if (intersection.length > 3) {
                let intersectedWordObjects = topicKeywordSets[i].filter(wordObject => {
                    return _.contains(intersection, wordObject.text);
                });
                let differentWordObjects = topicKeywordSets[i].filter(wordObject => {
                    return _.contains(difference, wordObject.text);
                });
                insertionSchema.push({
                    target: threadKeywords[0].id,
                    boostKeywords : intersectedWordObjects,
                    newKeywords : differentWordObjects
                });
            }
        });
    });
    return insertionSchema;
};

module.exports = { getKeywordSets, formulateInsertionSchema };