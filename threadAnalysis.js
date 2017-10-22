const powerCompare = require("./relevance.js");
const _ = require("underscore");

const grabKeywords = (topic) => {

    return topic.keywords;

}

const decayAllTopics = (thread, decay) => {

    let currentThreadKeywords = grabKeywords(thread);
    currentThreadKeywords.forEach((keyword) => {
        let newRelevance = keyword.relevance * decay;
        newRelevance = newRelevance.toFixed(6);
        keyword.relevance = newRelevance;
     
    })
}

const addKeywordsToThread = (topic, thread, intersection, boost) => {

    let topicKeywords = grabKeywords(topic);

    for (let i = 0; i < topicKeywords.length; i++) {
        let currentKeywordObject = topicKeywords[i];
        let currentTopicKeyword = topicKeywords[i].text.toLowerCase();
        
        if (_.contains(intersection, currentTopicKeyword)) {
            let threadObjects = grabKeywords(thread);
            
            for (let i = 0; i < threadObjects.length; i++) {
            
                if (threadObjects[i].text.toLowerCase().includes(currentTopicKeyword)) {
                    let newRelevance = currentKeywordObject.relevance * boost;
                    newRelevance = newRelevance.toFixed(6);
                    threadObjects[i].relevance = Number(newRelevance);
                }
            }  
        } else {
            thread.keywords.push(currentKeywordObject);

        }
    }
return thread;
}

const addStoriesToThread = (topic,thread) => {
    thread.stories.push(topic.stories);
}

const topicThreadIntersection = (topic, thread) => {

    let topicKeywords = grabKeywords(topic);
    let threadKeywords = grabKeywords(thread);
    let intersection = powerCompare(topicKeywords, threadKeywords);
    return intersection;
}

const processTopicAndThread = (thread,topic,boost,decay) => {
    //grab intersection of the keywords;
    let intersection = topicThreadIntersection(thread,topic);
    console.log(intersection);
    //boost all the common keywords in the topic and add them to the thread
    addKeywordsToThread(thread,topic,intersection,1.3);
    //add all the stories to the thread
    addStoriesToThread(topic, thread)
    //decay all the relevances
    decayAllTopics(thread,0.9)
    //recalculate the thread score
    getNewScore(topic,thread);
}

const getNewScore = (topic,thread) => {
    thread.score += topic.score;
}

const grabRelevanceByKeyword = (thread,keyword) => {
   
    for (let i = 0; i < thread.keywords.length; i++) {
        if (thread.keywords[i].text === keyword) {
            return thread.keywords[i].relevance;
        }
    }
}
 
module.exports = {grabKeywords,decayAllTopics,addKeywordsToThread,addStoriesToThread,topicThreadIntersection,processTopicAndThread,getNewScore,grabRelevanceByKeyword}
