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
        const graphedCodes = graphStoryLinks(mappedArticles);
        const filteredCodes = filterOutOrphans(graphedCodes);
        const codedHeadlines = getCodedHeadlines(mappedArticles);
        const code1 = Object.keys(filteredCodes)[0];
        const groupedArticles = groupArticles(filteredCodes, mappedArticles, [code1]);

        fs.writeFileSync(path.join(__dirname, 'groupedArticles.js'),JSON.stringify(groupedArticles) + '\n\n');
        // fs.appendFileSync(path.join(__dirname, 'graphedStories.js'), JSON.stringify(codedHeadlines))
    })
    .catch(err => console.log(err));
}

prepareTopics();

const mapArticles = sources => {
    const mappedSources = sources.map((source, sourceIndex) => {
        return source.data.articles.map((article, articleIndex) => {
            return Object.assign({}, article, {
                code : (sourceIndex * 10 + articleIndex).toString(),
                source : source.data.source,
                score : source.data.articles.length - articleIndex,
                age : 0,
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

const filterOutOrphans = graph => {
    const codes = Object.keys(graph);
    const familyCodes = codes.filter(code => {
        return graph[code].length > 0
    })
    
    return familyCodes.reduce((acc, code) => {
        acc[code] = graph[code];
        return acc;
    }, {});
}

const groupArticles = (graph, articles, queue, collections = {1: []}, iteration = 1, visited = []) => {
    if (collections[iteration] === undefined) {
        collections[iteration] = [];
    }
    //get next from queue
    const code = queue[0];
    //add code to visited
    visited.push(code);
    //push article to collections[iteration]
    collections[iteration].push(articles[code]);
    //concat graph[code] to queue
    queue = queue.concat(graph[code]);
    
    //filter out those visited
    queue = queue.filter(elem => {
        return !visited.includes(elem);
    });
    
    //if q is not empty
    if (queue.length > 0) {
    //call again with graph, articles, queue.slice(1), collections, iteration, visited
        return groupArticles(graph, articles, queue, collections, iteration, visited);
    } else {
        visited.forEach(visit => {
            delete graph[visit];
        })
        const newKeys = Object.keys(graph);
        if (newKeys.length === 0) {
            return collections;
        } else {
            const nextKey = newKeys[0];
            return groupArticles(graph, articles, [nextKey], collections, iteration + 1, [])
        }
    }
}


// const search = (url, queue, visited, log, result) => {
//     if (queue.length === 0) {
//         return finalise(result, url, log)
//     }

//     let path = queue.shift();
//     visited.push(path);
//     let address = url + path;
//     if (path !== '') address += '.html';

//     https.get(address, data => {
//         let dataStore = ''
//         data.on('data', d => {
//             dataStore += d;
//         });
//         data.on('end', () => {
//             if (data.statusCode !== 200) {
//                 console.log(path, 'is broken');
//                 log[path] = address;
//             } else {
//                 console.log(path, 'works!');
//                 let results = parse(dataStore);
//                 results.forEach(result => {
//                     if (!visited.includes(result) && (!queue.includes(result))) queue.push(result);
//                 });
//             } 
//             return search(url, queue, visited, log, result)
//         });
//     });
// }