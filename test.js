const axios = require('axios');
const _ = require('lodash');
const stringSimilarity = require('string-similarity');
const fs = require('fs');
const path = require('path');
const threshhold = 0.45;
const htmlToText = require('html-to-text');

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





//prepareTopics();


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
        const mappedArticles = mapArticles(sources);
        const graphedStories = graphStoryLinks(mappedArticles);
        const codedHeadlines = getCodedHeadlines(mappedArticles);
        console.log(graphedStories)
        fs.writeFileSync(path.join(__dirname, 'graphedStories.js'), JSON.stringify(graphedStories) + '\n\n');
        fs.appendFileSync(path.join(__dirname, 'graphedStories.js'), JSON.stringify(codedHeadlines))
    })
    .catch(err => console.log(err));
}


const mapArticles = sources => {
    const mappedSources = sources.map((source, sourceIndex) => {
        return source.data.articles.map((article, articleIndex) => {
            return Object.assign({}, article, {
                code : sourceIndex * 10 + articleIndex,
                source : source.data.source,
                score : source.data.articles.length - articleIndex,
                age : 0
            })
        })
    })
    const reducedSources = mappedSources.reduce((acc, source) => {
        acc = acc.concat(source);
        //console.log(acc)
        return acc;
    }, []);
    return reducedSources;
};

const getCodedHeadlines = articles => {
    return articles.reduce((acc, article) => {
        acc = acc + `${article.code}: ${article.title}` + '\n';
        return acc;
    }, '');
}

const graphStoryLinks = articles => {
    const graph = articles.reduce((acc, article) => {
        acc[article.code] = [];
        return acc;
    }, {});

    for (let i = 0; i < articles.length; i++) {
        for (let j = i + 1; j < articles.length; j++) {
            let similarity = getHeadlineSimilarity(articles[i], articles[j]);
            if (similarity > threshhold && similarity < 1) {
                graph[articles[i].code].push(articles[j].code);
                graph[articles[j].code].push(articles[i].code);
            }
        }
    }
    return graph;
}

const getHeadlineSimilarity = (article1, article2) => {
    return stringSimilarity.compareTwoStrings(article1.title, article2.title);
}

const collateCollections = titles => {
    let collections = [];    
    for(let i = 0; i < titles.length; i ++) {

        collections.push({
            comparative : titles[i],
            similars : [],
            weight : 0
        })
        
        for(let j = i + 1; j < titles.length; j++) {
            let scores = [];
            scores.push(stringSimilarity.compareTwoStrings(collections[i].comparative, titles[j]));
            collections[i].similars.forEach(hline => {
                scores.push(stringSimilarity.compareTwoStrings(hline, titles[j]));
            })
            if (scores.some(score => score > threshhold) && scores.every(score => score < 1)) {
                collections[i].similars.push(titles[j]);
                collections[i].weight += 11 - (j % 10);
            }
        }
        
    }

    const tops = collections.filter(comparison => comparison.similars.length > 0);
    tops.sort((a, b) => b.weight - a.weight);

    console.log('******************************************************\n', tops.slice(0,20))
}