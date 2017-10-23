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



const getCodedHeadlines = articles => {
    return articles.reduce((acc, article) => {
        acc = acc + `${article.code}: ${article.title}` + '\n';
        return acc;
    }, '');
}