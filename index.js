const _ = require('underscore');

const { getKeywordSets, formulateInsertionSchema } = require('./utils');
const topicData = require('./spec/topicData');
const { threadTextAndId2 } = require('./spec/threadData2');

const mergeTopicsWithThreads = (topics) => {

    const allTopicsKeywords = Object.keys(topics).map(topic => topics[topic].keywords);

    const keywordSets = getKeywordSets(allTopicsKeywords);

    const insertionSchema = formulateInsertionSchema(keywordSets);
    
    //console.log(insertionSchema);
};

mergeTopicsWithThreads(topicData);