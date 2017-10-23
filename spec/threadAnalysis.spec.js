const { expect } = require("chai");
const _ = require("underscore");
const { grabKeywords, decayAllTopics, addKeywordsToThread, addStoriesToThread, topicThreadIntersection, processTopicAndThread, getNewScore,grabRelevanceByKeyword } = require("../threadAnalysis")

const topic = {
    "stories": [
        {
            "author": null,
            "title": "Suicide bombers kill at least 63 people in Afghanistan mosque attacks",
            "description": "Suicide bombers strike two mosques in Afghanistan during Friday prayers, killing at least 63 people at the end of a particularly deadly week for the troubled nation.",
            "url": "http://www.abc.net.au/news/2017-10-21/suicide-bombers-kill-at-least-63-people-in-afghanistan/9072802",
            "urlToImage": "http://www.abc.net.au/news/image/8761664-1x1-700x700.jpg",
            "publishedAt": "2017-10-20T20:17:01Z",
            "code": "78",
            "source": "abc-news-au",
            "score": 2,
            "age": 0,
            "assigned": false
        },
        {
            "author": "Sune Engel Rasmussen",
            "title": "Dozens killed in twin bombings of mosques in Afghanistan",
            "description": "Suicide bombings in capital Kabul and Ghor province leave at least 70 dead, the latest in a series of attacks across the country",
            "url": "https://www.theguardian.com/world/2017/oct/20/dozens-killed-in-twin-bombings-of-mosques-in-afghanistan",
            "urlToImage": "https://i.guim.co.uk/img/media/7643575f86bef422bda50d713cdddc1534f3cdd0/0_44_3501_2102/master/3501.jpg?w=1200&h=630&q=55&auto=format&usm=12&fit=crop&crop=faces%2Centropy&bm=normal&ba=bottom%2Cleft&blend64=aHR0cHM6Ly91cGxvYWRzLmd1aW0uY28udWsvMjAxNi8wNS8yNS9vdmVybGF5LWxvZ28tMTIwMC05MF9vcHQucG5n&s=4fe1a34a75f6e232da9616de1a39b433",
            "publishedAt": "2017-10-20T18:22:16Z",
            "code": "136",
            "source": "the-guardian-au",
            "score": 4,
            "age": 0,
            "assigned": false
        }
    ],
    "keywords": [
        {
            "text": "Afghanistan Suicide bombings",
            "relevance": 0.948202
        },
        {
            "text": "attacks Suicide bombers",
            "relevance": 0.84555
        },
        {
            "text": "twin bombings",
            "relevance": 0.45711
        },
        {
            "text": "capital Kabul",
            "relevance": 0.347496
        },
        {
            "text": "Friday prayers",
            "relevance": 0.345632
        },
        {
            "text": "troubled nation.Dozens",
            "relevance": 0.330167
        },
        {
            "text": "Ghor province",
            "relevance": 0.280914
        },
        {
            "text": "mosques",
            "relevance": 0.216834
        }
    ],
    "score": 6
}

const thread =
    {
        "stories": [
            {
                "author": "BBC News",
                "title": "Attacks on Afghan mosques kill scores",
                "description": "Some 60 people are killed as worshippers are targeted in two separate attacks on mosques.",
                "url": "http://www.bbc.co.uk/news/world-asia-41699320",
                "urlToImage": "https://ichef-1.bbci.co.uk/news/1024/cpsprodpb/B522/production/_98407364_soldiers.gif",
                "publishedAt": "2017-10-20T19:04:36Z",
                "code": "1",
                "source": "bbc-news",
                "score": 9,
                "age": 0,
                "assigned": false
            },
            {
                "author": "AMIR SHAH",
                "title": "Suicide bombings in Afghanistan hit mosques, killing 63",
                "description": "KABUL, Afghanistan (AP) — Suicide bombers struck two mosques in Afghanistan during Friday prayers, a Shiite mosque in Kabul and a Sunni mosque in western Ghor province, killing at least 63 people at the end of a particularly deadly week for the troubled nation. The Afghan president issued a statement condemning both attacks and saying that country's security forces would step up the fight to \"eliminate the terrorists who target Afghans of all religions and tribes.\"",
                "url": "https://apnews.com/c6e694defb854f7f897b4224a737a270",
                "urlToImage": "",
                "publishedAt": "2017-10-20T21:07:43Z",
                "code": "17",
                "source": "associated-press",
                "score": 3,
                "age": 0,
                "assigned": false
            },
            {
                "author": "Al Jazeera",
                "title": "Deadly attacks hit mosques in Kabul and Ghor",
                "description": "Shia mosque in Kabul and Sunni mosque in Ghor province targeted in separate incidents, claiming more than 60 lives.",
                "url": "http://www.aljazeera.com/news/2017/10/dozens-feared-dead-attacks-afghanistan-171020142936566.html",
                "urlToImage": "http://www.aljazeera.com/mritems/Images/2017/10/1/877c095c5d2946d1a4b6e7f4da3d9b48_18.jpg",
                "publishedAt": "2017-10-20T14:46:00Z",
                "code": "20",
                "source": "al-jazeera-english",
                "score": 10,
                "age": 0,
                "assigned": false
            }
        ],
        "keywords": [
            {
                "text": "Sunni mosque",
                "relevance": 0.954235
            },
            {
                "text": "Ghor Shia mosque",
                "relevance": 0.881881
            },
            {
                "text": "Afghan mosques",
                "relevance": 0.757254
            },
            {
                "text": "Shiite mosque",
                "relevance": 0.708954
            },
            {
                "text": "western Ghor province",
                "relevance": 0.697653
            },
            {
                "text": "separate attacks",
                "relevance": 0.608324
            },
            {
                "text": "Deadly attacks",
                "relevance": 0.560192
            },
            {
                "text": "kabul",
                "relevance": 0.515003
            },
            {
                "text": "mosques.Suicide bombings",
                "relevance": 0.473608
            },
            {
                "text": "Suicide bombers",
                "relevance": 0.449984
            },
            {
                "text": "Afghan president",
                "relevance": 0.442296
            },
            {
                "text": "Friday prayers",
                "relevance": 0.427284
            },
            {
                "text": "troubled nation",
                "relevance": 0.425392
            },
            {
                "text": "separate incidents",
                "relevance": 0.412804
            },
            {
                "text": "security forces",
                "relevance": 0.380585
            },
            {
                "text": "Afghanistan",
                "relevance": 0.318416
            }
        ],
        "score": 22
    }



describe.only("processing TOPICS", () => {
    describe("grabKeywords", () => {
        it("is a function", () => {
            expect(grabKeywords).to.be.a("function");
        })
    })
    xdescribe("decayAllTopics", () => {
        it("is a function", () => {
            expect(decayAllTopics).to.be.a("function");
        })
        // it("decays all topics", () => {
        //     expect(_.pluck(thread.keywords, "relevance")[0] > 0).to.equal(true);
        //     decayAllTopics(thread, -1);
        //     expect(_.pluck(thread.keywords, "relevance")[0] < 0).to.equal(true);
        // })

    })
    describe("addKeywordsToThread", () => {
        it("is a function", () => {
            expect(addKeywordsToThread).to.be.a("function");
        })

    })
    describe("addStoriesToThread", () => {
        it("is a function", () => {
            expect(addStoriesToThread).to.be.a("function");
        })

    })
    describe("topicThreadIntersection", () => {
        it("is a function", () => {
            expect(topicThreadIntersection).to.be.a("function");
        })

    })
    describe("processTopicAndThread", () => {
        const oldLength = thread.keywords.length;
        const oldRelevance = grabRelevanceByKeyword(thread,"kabul");
        processTopicAndThread(topic, thread, 100, 0.7);
        
        it("is a function", () => {
            expect(processTopicAndThread).to.be.a("function");
        })
        it("it changes the length of the topic keywords", () => {
            expect(thread.keywords.length).to.not.equal(oldLength);
        })
        it("it changes the length of the stories arrays", () => {

            expect(thread.keywords.length).to.not.equal(5);
        })
        it("it changes the length of the stories arrays", () => {

            expect(thread.keywords.length).to.not.equal(5);
        })
        it("it changes the length of the stories arrays", () => {
            const newRelevance = grabRelevanceByKeyword(thread,"kabul");
            expect(newRelevance).to.equal(oldRelevance*100);
        })

    })

    xdescribe("getNewScore", () => {
        it("is a function", () => {
            expect(getNewScore).to.be.a("function");
        })
        it("changes the topic score after being called", () => {
            expect(thread.score).to.equal(22);
            getNewScore(topic, thread);
            expect(thread.stories.length).to.equal(5);
        })
    })
})
