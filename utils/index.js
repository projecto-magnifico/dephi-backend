const {
    arrSieve,
    decimalToBinary,
    zeroFiller
} = require('../helpers');

const getSets = keyword => {

    const splitKeywords = keyword.split(' ');
    let keywordSetArray = [];
    let n = splitKeywords.length;
    let maxLength = Math.pow(2, n) - 1;
    let count = 0;
    while (count !== maxLength + 1) {
        let currentIndexArray = decimalToBinary(count);
        let filledArray = zeroFiller(currentIndexArray, splitKeywords);
        let currentItem = arrSieve(splitKeywords, filledArray);
        keywordSetArray.push(currentItem);
        count++;
    }
    const joinedKeywordSetArray = keywordSetArray.slice(1).map(keywordSet => {
        return keywordSet.join(' ');
    });

    return joinedKeywordSetArray;
    //return finalResult.map(array => array.join(' '));
};

const grabRelevanceByKeyword = (thread, keyword) => {

    for (let i = 0; i < thread.keywords.length; i++) {
        if (thread.keywords[i].text === keyword) {
            return thread.keywords[i].relevance;
        }
    }
};

module.exports = { grabRelevanceByKeyword, getSets };