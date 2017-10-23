const axios = require('axios');
const _ = require('lodash');
const stringSimilarity = require('string-similarity');
const fs = require('fs');
const path = require('path');
const threshhold = 0.45;
const htmlToText = require('html-to-text');
const Promise = require("bluebird");

const {mapArticles, graphArticleLinks, groupArticles} = require('./utils');
const { newsApi } = require('./config/api.config.js');

const prepareTopics = () => {
    const sources = Object.values(newsApi.sources);
    Promise.map(sources, (source) => {
        return axios.get(`${newsApi.url}?source=${source}&sortBy=top&apiKey=${newsApi.apiKey}`);
    })
    .then(sources => {
        const mappedArticles = mapArticles(sources);
        const graphedCodes = graphArticleLinks(mappedArticles);
        const code1 = Object.keys(graphedCodes)[0];
        const groupedArticles = groupArticles(graphedCodes, mappedArticles, [code1]);
        console.log(groupedArticles);
    })
    .catch(err => console.log(err));
}

prepareTopics();

