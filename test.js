const axios = require('axios');
const _ = require('lodash');
const stringSimilarity = require('string-similarity');

const threshhold = 0.5;

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
.then(info => {
    info = _.shuffle(info);
    //countTitleDescWords(info);
    countSimilarStrings(info);
})
.catch(err => console.log(err));

const countTitleDescWords = info => {
    let titleDesc = '';
    info.forEach(source => {
        source.data.articles.forEach(article => titleDesc += `${article.title} ${article.description}`)
    });
    let wordArray = titleDesc.split(' ');
    let allWords = wordArray.reduce((acc, word) => {
        word = word.replace(/\W+/g, '')
        word = word.toLowerCase();
        if (acc[word] === undefined) {
            acc[word] = 1;
        } else acc[word]++;
        return acc;
    }, {})
    let sortWords = _.groupBy(Object.keys(allWords), (word) => allWords[word]);
    console.log('******************************************************\n', sortWords)
};

const countSimilarStrings = info => {
    let titles = [];
    info.forEach(source => {
        source.data.articles.forEach(article => {
            if (!titles.includes(article.title)) {
                titles.push(article.title)
            }
        });
    });

    //collateComparisons(titles);
    collateCollections(titles);
};

const collateComparisons = titles => {
    let comparisons = [];
    for(let i = 0; i < titles.length; i ++) {
        for(let j = i + 1; j < titles.length; j++) {


            let compObj = {
                textA : titles[i],
                textB : titles[j],
                score : stringSimilarity.compareTwoStrings(titles[i], titles[j])
            }
            if (compObj.score > threshhold && compObj.score < 1) comparisons.push(compObj);
        }
    }
    comparisons.sort((a, b) => b.score - a.score)
    console.log('******************************************************\n', comparisons)
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