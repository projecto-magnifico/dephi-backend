const strSim = require('string-similarity');

const concatArrays = (first, second) => {
    return first.concat(second);
}

const getStringSimilarity = (first, second) => {
    return strSim.compareTwoStrings(first, second);
}

const createEmptyGraph = length => {
    return Array(length).fill(null).reduce((acc, x, i) => {
        acc[i] = [];
        return acc;
    }, {});
}


const filterGraphOrphans = graph => {
    return Object.keys(graph).reduce((acc, code) => {
        if (graph[code].length > 0) acc[code] = graph[code];
        return acc;
    }, {});
}

module.exports = {concatArrays, getStringSimilarity, createEmptyGraph, filterGraphOrphans};
