const axios = require('axios');
const _ = require('lodash');
const stringSimilarity = require('string-similarity');
const fs = require('fs');
const path = require('path');
const threshhold = 0.45;
const htmlToText = require('html-to-text');

const {mapArticles, graphArticleLinks, groupArticles} = require('./utils');

// ATTENTION! ACHTUNG!
// uncomment 'tryit' below to see how a call to a news article url returns the formatted HTML. Still need to extract the story section.

//OR uncomment the 'preparetopics' call underneath - this will write a file to your folder called 'graphedStories' which will contain the graph, with some stupid formatting. follow through the methods to see how it works. 


// const tryit = () => {
//     axios.get('http://www.bbc.co.uk/news/world-us-canada-41688684')
// .then(res => {
//     console.log(htmlToText.fromString(res.data, {
//         wordwrap: 130
//     }));
        
//         //res.data.match(/\<p\>\w+<\/p>/))
// })
// .catch(err => console.log(err));
// }
// tryit();

const prepareTopics = () => {
    Promise.all([
        //BBC NEWS
        axios.get('https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=3c987396588c4a848a262ed47ba9d61b'),
        //AP
        axios.get('https://newsapi.org/v1/articles?source=associated-press&sortBy=top&apiKey=3c987396588c4a848a262ed47ba9d61b'),
        //AL JAZEERA
        axios.get('https://newsapi.org/v1/articles?source=al-jazeera-english&sortBy=top&apiKey=3c987396588c4a848a262ed47ba9d61b'),
        //REUTERS
        axios.get('https://newsapi.org/v1/articles?source=reuters&sortBy=top&apiKey=3c987396588c4a848a262ed47ba9d61b'),
        //WASHINGTON POST
        axios.get('https://newsapi.org/v1/articles?source=the-washington-post&sortBy=top&apiKey=3c987396588c4a848a262ed47ba9d61b'),
        //GUARDIAN UK
        axios.get('https://newsapi.org/v1/articles?source=the-guardian-uk&sortBy=top&apiKey=3c987396588c4a848a262ed47ba9d61b'),
        //INDEPENDENT UK
        axios.get('https://newsapi.org/v1/articles?source=independent&sortBy=top&apiKey=3c987396588c4a848a262ed47ba9d61b'),
        //ABC AUS
        axios.get('https://newsapi.org/v1/articles?source=abc-news-au&sortBy=top&apiKey=3c987396588c4a848a262ed47ba9d61b'),
        //CNN
        axios.get('https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=3c987396588c4a848a262ed47ba9d61b'),
        //METRO
        axios.get('https://newsapi.org/v1/articles?source=metro&sortBy=top&apiKey=3c987396588c4a848a262ed47ba9d61b'),
        //MIRROR UK
        axios.get('https://newsapi.org/v1/articles?source=mirror&sortBy=top&apiKey=3c987396588c4a848a262ed47ba9d61b'),
        //NEWSWEEK
        axios.get('https://newsapi.org/v1/articles?source=newsweek&sortBy=top&apiKey=3c987396588c4a848a262ed47ba9d61b'),
        //NY MAGAZINE
        axios.get('https://newsapi.org/v1/articles?source=new-york-magazine&sortBy=top&apiKey=3c987396588c4a848a262ed47ba9d61b'),
        //GUARDIAN AU
        axios.get('https://newsapi.org/v1/articles?source=the-guardian-au&sortBy=top&apiKey=3c987396588c4a848a262ed47ba9d61b'),
        //HUFF POST
        axios.get('https://newsapi.org/v1/articles?source=the-huffington-post&sortBy=top&apiKey=3c987396588c4a848a262ed47ba9d61b'),
        //NY TIMES
        axios.get('https://newsapi.org/v1/articles?source=the-new-york-times&sortBy=top&apiKey=3c987396588c4a848a262ed47ba9d61b'),
        //USA TODAY
        axios.get('https://newsapi.org/v1/articles?source=usa-today&sortBy=top&apiKey=3c987396588c4a848a262ed47ba9d61b')
    ])
    .then(sources => {
        fs.writeFileSync(path.join(__dirname, 'spec', 'test_data.json'), JSON.stringify(sources[0].data));
        const mappedArticles = mapArticles(sources);
        const graphedCodes = graphArticleLinks(mappedArticles);
        const code1 = Object.keys(graphedCodes)[0];
        const groupedArticles = groupArticles(graphedCodes, mappedArticles, [code1]);
        console.log(groupedArticles);
        //fs.writeFileSync(path.join(__dirname, 'groupedArticles.js'),JSON.stringify(groupedArticles) + '\n\n');
        // fs.appendFileSync(path.join(__dirname, 'graphedStories.js'), JSON.stringify(codedHeadlines))
    })
    .catch(err => console.log(err));
}

prepareTopics();

