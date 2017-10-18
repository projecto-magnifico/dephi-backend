const axios = require('axios');
const _ = require('lodash');
const fs = require('fs-extra');


const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var nlu = new NaturalLanguageUnderstandingV1({
    username: '9dcbde29-933b-4955-aa18-025681cee1da',
    password: '1ns5rCS5KK1x',
    version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
})
// nlu.analyze({
//     'html': sonnet,
//     'features': {
//         'concepts': {},
//         'keywords': {}
//     }
// }, function (err, response) {
//     if (err) console.error;

// })


Promise.all([
        //BBC NEWS
        // axios.get('https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=3c987396588c4a848a262ed47ba9d61b')
        //AP
        // axios.get('https://newsapi.org/v1/articles?source=associated-press&sortBy=top&apiKey=3c987396588c4a848a262ed47ba9d61b'),
        // //AL JAZEERA
        // axios.get('https://newsapi.org/v1/articles?source=al-jazeera-english&sortBy=top&apiKey=3c987396588c4a848a262ed47ba9d61b'),
        // //REUTERS
        // axios.get('https://newsapi.org/v1/articles?source=reuters&sortBy=top&apiKey=3c987396588c4a848a262ed47ba9d61b'),
        // //WASHINGTON POST
        // axios.get('https://newsapi.org/v1/articles?source=the-washington-post&sortBy=top&apiKey=3c987396588c4a848a262ed47ba9d61b'),
        //GUARDIAN UK
        axios.get('https://newsapi.org/v1/articles?source=the-guardian-uk&sortBy=top&apiKey=3c987396588c4a848a262ed47ba9d61b')
        //INDEPENDENT UK
        // axios.get('https://newsapi.org/v1/articles?source=independent&sortBy=top&apiKey=3c987396588c4a848a262ed47ba9d61b')

    ])
    .then(info => {
        countTitleDescWords(info);
        // countSimilarStrings(info);
    })
    .catch(err => console.log(err));

const countTitleDescWords = info => {
    info.forEach(source => {
        let titleDesc = '';
        source.data.articles.forEach(article => {

            let titleDesc = "";
            titleDesc += article.title + " " + article.description;
            nlu.analyze({
                'html': titleDesc,
                'features': {
                    'concepts': {},
                    'keywords': {}
                }
            }, function (err, response) {
                // console.log(response);
                // let keywords = response.keywords;
                if (err) console.error;
                    fs.appendFile('./newsDataGuardian12.json', JSON.stringify(response,null,2), "utf8", (err) => {
                        if (err) throw err;
                })
            })
        })
    });
}