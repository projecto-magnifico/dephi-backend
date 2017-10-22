const _ = require("underscore");

const {
  arrSieve,
  decimalToBinary,
  getSets,
  zeroFiller,
  nullArray
} = require("./helpers.js")

const arr1 = [{
    "text": "Melania Trump",
    "relevance": 0.963443
  },
  {
    "text": "Donald Trump",
    "relevance": 0.816146
  },
  {
    "text": "spokeswoman",
    "relevance": 0.595245
  },
  {
    "text": "Ivana",
    "relevance": 0.519275
  },
  {
    "text": "attention",
    "relevance": 0.472937
  },
  {
    "text": "lady",
    "relevance": 0.386439
  },
  {
    "text": "comments",
    "relevance": 0.384935
  }
]

const arr2 = [{
    "text": "Pence NFL protest",
    "relevance": 0.942527
  },
  {
    "text": "PR stunt",
    "relevance": 0.519803
  },
  {
    "text": "walkout Critics",
    "relevance": 0.414727
  },
  {
    "text": "vice-president",
    "relevance": 0.315633
  },
  {
    "text": "Trump",
    "relevance": 0.283045
  },
  {
    "text": "taxpayers",
    "relevance": 0.266189
  },
  {
    "text": "expense",
    "relevance": 0.232731
  }
]

const tues = [{
    "text": "mogul Harvey Weinstein",
    "relevance": 0.942959
  },
  {
    "text": "Weinstein Leading actresses",
    "relevance": 0.875413
  },
  {
    "text": "sexual harassment claims",
    "relevance": 0.622048
  },
  {
    "text": "Hollywood stars",
    "relevance": 0.305686
  }
]

const weds = [{
    "text": "Harvey Weinstein",
    "relevance": 0.902316
  },
  {
    "text": "Weinstein story",
    "relevance": 0.864464
  },
  {
    "text": "Matt Damon",
    "relevance": 0.823997
  },
  {
    "text": "reporter",
    "relevance": 0.462604
  },
  {
    "text": "behaviour",
    "relevance": 0.458327
  },
  {
    "text": "actor",
    "relevance": 0.389314
  }
]

const thurs = [{
    "text": "producer Harvey Weinstein",
    "relevance": 0.913063
  },
  {
    "text": "new york",
    "relevance": 0.808398
  },
  {
    "text": "spokesman Peter Donald",
    "relevance": 0.768555
  },
  {
    "text": "fresh look",
    "relevance": 0.758396
  },
  {
    "text": "New York City",
    "relevance": 0.753104
  },
  {
    "text": "inappropriate conduct",
    "relevance": 0.638861
  },
  {
    "text": "Police detectives",
    "relevance": 0.621728
  },
  {
    "text": "sexual assault",
    "relevance": 0.616058
  },
  {
    "text": "additional complaints",
    "relevance": 0.59409
  },
  {
    "text": "London police",
    "relevance": 0.590375
  },
  {
    "text": "police files",
    "relevance": 0.570015
  },
  {
    "text": "allegations",
    "relevance": 0.460969
  },
  {
    "text": "NYC",
    "relevance": 0.447641
  },
  {
    "text": "women",
    "relevance": 0.447417
  },
  {
    "text": "investigators",
    "relevance": 0.442765
  },
  {
    "text": "Thursday",
    "relevance": 0.438098
  },
  {
    "text": "Hollywood",
    "relevance": 0.430675
  },
  {
    text: "film",
    "relevance": 0.43064
  }
]
const thursLatest = [{
    text: 'new york',
    relevance: 0.923566
  },
  {
    text: 'spokesman Peter Donald',
    relevance: 0.830486
  },
  {
    text: 'Hollywood film producer',
    relevance: 0.812807
  },
  {
    text: 'fresh look',
    relevance: 0.80913
  },
  {
    text: 'New York City',
    relevance: 0.801413
  },
  {
    text: 'Harvey Weinstein',
    relevance: 0.771066
  },
  {
    text: 'inappropriate conduct',
    relevance: 0.56961
  },
  {
    text: 'Police detectives',
    relevance: 0.535597
  },
  {
    text: 'sexual assault',
    relevance: 0.527325
  },
  {
    text: 'London police',
    relevance: 0.476873
  },
  {
    text: 'well-known case',
    relevance: 0.474113
  },
  {
    text: 'police files',
    relevance: 0.43804
  },
  {
    text: 'allegations',
    relevance: 0.217206
  }
]

const monday = [{
    "text": "producer Harvey Weinstein",
    "relevance": 0.948177
  },
  {
    "text": "new British allegations",
    "relevance": 0.780022
  },
  {
    "text": "Sexual Offenses Command",
    "relevance": 0.712193
  },
  {
    "text": "Motion Picture Arts",
    "relevance": 0.709532
  },
  {
    "text": "Metropolitan Police force",
    "relevance": 0.660302
  },
  {
    "text": "new allegations",
    "relevance": 0.594658
  },
  {
    "text": "Honor LONDON",
    "relevance": 0.531225
  },
  {
    "text": "French president",
    "relevance": 0.529429
  },
  {
    "text": "sexual assault",
    "relevance": 0.490592
  },
  {
    "text": "Honor award",
    "relevance": 0.484161
  },
  {
    "text": "Hollywood titan",
    "relevance": 0.47028
  },
  {
    "text": "Child Abuse",
    "relevance": 0.412602
  },
  {
    "text": "Legion",
    "relevance": 0.277643
  }
]
const vegas1 = [{
    "text": "gunfire Mandalay Bay",
    "relevance": 0.991849
  },
  {
    "text": "deadliest mass shooting",
    "relevance": 0.785033
  },
  {
    "text": "country music festival",
    "relevance": 0.744974
  },
  {
    "text": "modern U.S. history",
    "relevance": 0.655769
  },
  {
    "text": "Stephen Paddock",
    "relevance": 0.487006
  },
  {
    "text": "hotel officials",
    "relevance": 0.424306
  },
  {
    "text": "Vegas hotel",
    "relevance": 0.404218
  },
  {
    "text": "Associated Press",
    "relevance": 0.400428
  },
  {
    "text": "federal official",
    "relevance": 0.386573
  },
  {
    "text": "law enforcement",
    "relevance": 0.358456
  }
];

const vegas2 = [{
    "text": "Stephen Paddock",
    "relevance": 0.912913
  },
  {
    "text": "Vegas police",
    "relevance": 0.742874
  },
  {
    "text": "room Officers",
    "relevance": 0.728069
  },
  {
    "text": "gunman",
    "relevance": 0.633301
  },
  {
    "text": "armoury",
    "relevance": 0.59234
  },
  {
    "text": "note",
    "relevance": 0.423312
  }
]
const trump = [{
    "text": "explosive four-minute tirade",
    "relevance": 0.968399
  },
  {
    "text": "best lines",
    "relevance": 0.64798
  },
  {
    "text": "Trump",
    "relevance": 0.481869
  },
  {
    "text": "Eminem",
    "relevance": 0.470912
  },
  {
    "text": "rapper",
    "relevance": 0.467747
  },
  {
    "text": "Tuesday",
    "relevance": 0.428142
  },
  {
    "text": "president",
    "relevance": 0.421685
  }
]

const catalan1 = [{
    "text": "independence status BARCELONA",
    "relevance": 0.968102
  },
  {
    "text": "Carles Puigdemont",
    "relevance": 0.786287
  },
  {
    "text": "independence referendum",
    "relevance": 0.73974
  },
  {
    "text": "ambiguous declaration",
    "relevance": 0.663354
  },
  {
    "text": "Catalan leader",
    "relevance": 0.642433
  },
  {
    "text": "Monday deadline",
    "relevance": 0.635678
  },
  {
    "text": "central government",
    "relevance": 0.627549
  },
  {
    "text": "Catalonia",
    "relevance": 0.50148
  },
  {
    "text": "Spain",
    "relevance": 0.484412
  },
  {
    "text": "letter",
    "relevance": 0.410183
  },
  {
    "text": "AP",
    "relevance": 0.392877
  },
  {
    "text": "dialogue",
    "relevance": 0.379465
  },
  {
    "text": "talks",
    "relevance": 0.363554
  },
  {
    "text": "time",
    "relevance": 0.353861
  },
  {
    "text": "mediation",
    "relevance": 0.353624
  }
]

const catalan2 = [{
    "text": "Catalan direct rule",
    "relevance": 0.978827
  },
  {
    "text": "Spanish government",
    "relevance": 0.726282
  },
  {
    "text": "Catalonia",
    "relevance": 0.575212
  },
  {
    "text": "independence",
    "relevance": 0.535119
  },
  {
    "text": "Spain",
    "relevance": 0.462227
  },
  {
    "text": "step",
    "relevance": 0.461661
  }
]
const newsCall1 = [
  [{
      "text": "mogul Harvey Weinstein",
      "relevance": 0.942959
    },
    {
      "text": "Weinstein Leading actresses",
      "relevance": 0.875413
    },
    {
      "text": "sexual harassment claims",
      "relevance": 0.622048
    },
    {
      "text": "Hollywood stars",
      "relevance": 0.305686
    }
  ],
  [{
      "text": "parental rights",
      "relevance": 0.959941
    },
    {
      "text": "victim",
      "relevance": 0.769187
    },
    {
      "text": "Rapist",
      "relevance": 0.648684
    },
    {
      "text": "perpetrator",
      "relevance": 0.620312
    },
    {
      "text": "custody",
      "relevance": 0.524017
    }
  ],
  [{
      "text": "visa suspension Turkey",
      "relevance": 0.990332
    },
    {
      "text": "consulate worker",
      "relevance": 0.781906
    },
    {
      "text": "visa services",
      "relevance": 0.756257
    },
    {
      "text": "Istanbul",
      "relevance": 0.43773
    },
    {
      "text": "Erdogan",
      "relevance": 0.333702
    }
  ],
  [{
      "text": "President Trump",
      "relevance": 0.919957
    },
    {
      "text": "Republican senator",
      "relevance": 0.765356
    },
    {
      "text": "path",
      "relevance": 0.394827
    },
    {
      "text": "reality",
      "relevance": 0.370194
    },
    {
      "text": "WW3",
      "relevance": 0.264582
    },
    {
      "text": "office",
      "relevance": 0.261379
    }
  ],
  [{
      "text": "advertising campaign Dove",
      "relevance": 0.904723
    },
    {
      "text": "black woman",
      "relevance": 0.533105
    },
    {
      "text": "Facebook",
      "relevance": 0.372776
    },
    {
      "text": "soap",
      "relevance": 0.320694
    },
    {
      "text": "series",
      "relevance": 0.261386
    },
    {
      "text": "images",
      "relevance": 0.260349
    }
  ],
  [{
      "text": "Pence NFL protest",
      "relevance": 0.942527
    },
    {
      "text": "PR stunt",
      "relevance": 0.519803
    },
    {
      "text": "walkout Critics",
      "relevance": 0.414727
    },
    {
      "text": "vice-president",
      "relevance": 0.315633
    },
    {
      "text": "Trump",
      "relevance": 0.283045
    },
    {
      "text": "taxpayers",
      "relevance": 0.266189
    },
    {
      "text": "expense",
      "relevance": 0.232731
    }
  ],
  [{
      "text": "Stephen Paddock",
      "relevance": 0.912913
    },
    {
      "text": "Vegas police",
      "relevance": 0.742874
    },
    {
      "text": "room Officers",
      "relevance": 0.728069
    },
    {
      "text": "gunman",
      "relevance": 0.633301
    },
    {
      "text": "armoury",
      "relevance": 0.59234
    },
    {
      "text": "note",
      "relevance": 0.423312
    }
  ],
  [{
      "text": "Melania Trump",
      "relevance": 0.963443
    },
    {
      "text": "Donald Trump",
      "relevance": 0.816146
    },
    {
      "text": "spokeswoman",
      "relevance": 0.595245
    },
    {
      "text": "Ivana",
      "relevance": 0.519275
    },
    {
      "text": "attention",
      "relevance": 0.472937
    },
    {
      "text": "lady",
      "relevance": 0.386439
    },
    {
      "text": "comments",
      "relevance": 0.384935
    }
  ],
  [{
      "text": "Obama clean power",
      "relevance": 0.987777
    },
    {
      "text": "environment head",
      "relevance": 0.687634
    },
    {
      "text": "Trump",
      "relevance": 0.601284
    },
    {
      "text": "withdrawal",
      "relevance": 0.571679
    },
    {
      "text": "coal",
      "relevance": 0.544737
    },
    {
      "text": "rule",
      "relevance": 0.531615
    },
    {
      "text": "war",
      "relevance": 0.441187
    },
    {
      "text": "plan",
      "relevance": 0.438177
    }
  ],
  [{
      "text": "Behavioural economics",
      "relevance": 0.926679
    },
    {
      "text": "better understanding",
      "relevance": 0.816029
    },
    {
      "text": "Thaler",
      "relevance": 0.664398
    },
    {
      "text": "things",
      "relevance": 0.376182
    },
    {
      "text": "way",
      "relevance": 0.372282
    }
  ]
]

const newsCall2 = [
  [{
      "text": "tenfold increase",
      "relevance": 0.918383
    },
    {
      "text": "atomic weapons",
      "relevance": 0.782224
    },
    {
      "text": "nuclear report",
      "relevance": 0.671423
    },
    {
      "text": "NBC",
      "relevance": 0.598362
    },
    {
      "text": "Trump",
      "relevance": 0.44204
    },
    {
      "text": "aim",
      "relevance": 0.371044
    },
    {
      "text": "president",
      "relevance": 0.367843
    }
  ],[{
      "text": "Harvey Weinstein",
      "relevance": 0.902316
    },
    {
      "text": "Weinstein story",
      "relevance": 0.864464
    },
    {
      "text": "Matt Damon",
      "relevance": 0.823997
    },
    {
      "text": "reporter",
      "relevance": 0.462604
    },
    {
      "text": "behaviour",
      "relevance": 0.458327
    },
    {
      "text": "actor",
      "relevance": 0.389314
    }
  ],[{
      "text": "wine-growing areas",
      "relevance": 0.951825
    },
    {
      "text": "deadly California",
      "relevance": 0.904599
    },
    {
      "text": "wildfires",
      "relevance": 0.731363
    },
    {
      "text": "Scores",
      "relevance": 0.57126
    },
    {
      "text": "people",
      "relevance": 0.565033
    }
  ],[{
      "text": "Catalan direct rule",
      "relevance": 0.978827
    },
    {
      "text": "Spanish government",
      "relevance": 0.726282
    },
    {
      "text": "Catalonia",
      "relevance": 0.575212
    },
    {
      "text": "independence",
      "relevance": 0.535119
    },
    {
      "text": "Spain",
      "relevance": 0.462227
    },
    {
      "text": "step",
      "relevance": 0.461661
    }
  ],[{
      "text": "Leonardo da Vinci",
      "relevance": 0.957679
    },
    {
      "text": "private hands",
      "relevance": 0.451299
    },
    {
      "text": "New York",
      "relevance": 0.386563
    },
    {
      "text": "100m",
      "relevance": 0.34906
    },
    {
      "text": "painting",
      "relevance": 0.226283
    },
    {
      "text": "sale",
      "relevance": 0.225432
    }
  ],[{
      "text": "explosive four-minute tirade",
      "relevance": 0.968399
    },
    {
      "text": "best lines",
      "relevance": 0.64798
    },
    {
      "text": "Trump",
      "relevance": 0.481869
    },
    {
      "text": "Eminem",
      "relevance": 0.470912
    },
    {
      "text": "rapper",
      "relevance": 0.467747
    },
    {
      "text": "Tuesday",
      "relevance": 0.428142
    },
    {
      "text": "president",
      "relevance": 0.421685
    }
  ],[{
      "text": "Hayden Kennedy",
      "relevance": 0.910957
    },
    {
      "text": "backcountry skiing",
      "relevance": 0.831788
    },
    {
      "text": "girlfriend",
      "relevance": 0.708898
    },
    {
      "text": "Climber",
      "relevance": 0.509929
    },
    {
      "text": "suicide",
      "relevance": 0.434679
    }
  ],[{
      "text": "Sydney rock pool",
      "relevance": 0.983339
    },
    {
      "text": "shark",
      "relevance": 0.870304
    },
    {
      "text": "Australia woman",
      "relevance": 0.848085
    },
    {
      "text": "sea",
      "relevance": 0.565352
    }
  ],[{
      "text": "football qualification",
      "relevance": 0.94964
    },
    {
      "text": "entire country",
      "relevance": 0.916972
    },
    {
      "text": "World Cup",
      "relevance": 0.802115
    },
    {
      "text": "Panama",
      "relevance": 0.685137
    },
    {
      "text": "president",
      "relevance": 0.636642
    },
    {
      "text": "holiday",
      "relevance": 0.502957
    }
  ],[{
      "text": "Harvey Weinstein scandal",
      "relevance": 0.962423
    },
    {
      "text": "Brooklyn Nine-Nine actor",
      "relevance": 0.695473
    },
    {
      "text": "claims",
      "relevance": 0.22856
    }
  ]
]

const brexit1 =  [
  {
    "text": "future trading agreement",
    "relevance": 0.997694
  },
  {
    "text": "David Davis",
    "relevance": 0.966515
  },
  {
    "text": "Brexit David Davis",
    "relevance": 0.953795
  },
  {
    "text": "transition phase",
    "relevance": 0.809002
  },
  {
    "text": "Conservative MP",
    "relevance": 0.796894
  },
  {
    "text": "final relationship",
    "relevance": 0.740058
  },
  {
    "text": "Brexit Secretary",
    "relevance": 0.724197
  },
  {
    "text": "permanent bridge",
    "relevance": 0.711636
  },
  {
    "text": "odds",
    "relevance": 0.623262
  },
  {
    "text": "deal",
    "relevance": 0.596782
  }
]

const brexit2 = [
  {
    "text": "Amber Rudd",
    "relevance": 0.798315
  },
  {
    "text": "no-deal Brexit",
    "relevance": 0.526726
  },
  {
    "text": "David Davis",
    "relevance": 0.507169
  },
  {
    "text": "agreement",
    "relevance": 0.317255
  },
  {
    "text": "Cabinet",
    "relevance": 0.312124
  },
  {
    "text": "idea",
    "relevance": 0.308713
  },
  {
    "text": "option",
    "relevance": 0.297009
  },
  {
    "text": "security",
    "relevance": 0.255282
  }
]
const brexit3 = 
[
  {
    "text": "Amber Rudd comments",
    "relevance": 0.957739
  },
  {
    "text": "Brexit Amber Rudd",
    "relevance": 0.918421
  },
  {
    "text": "bad deal",
    "relevance": 0.601001
  },
  {
    "text": "Cabinet level",
    "relevance": 0.551301
  },
  {
    "text": "Brexit negotiations",
    "relevance": 0.496063
  },
  {
    "text": "rift",
    "relevance": 0.31346
  },
  {
    "text": "Theresa",
    "relevance": 0.29622
  }
]
const terror1 = 
[
  {
    "text": "severe terror threat",
    "relevance": 0.992817
  },
  {
    "text": "MI5 chief Head",
    "relevance": 0.963011
  },
  {
    "text": "Islamist terrorism",
    "relevance": 0.825256
  },
  {
    "text": "intelligence service",
    "relevance": 0.651914
  },
  {
    "text": "‘dramatic upshift",
    "relevance": 0.641131
  },
  {
    "text": "attacks",
    "relevance": 0.495922
  },
  {
    "text": "UK",
    "relevance": 0.439461
  },
  {
    "text": "Britain",
    "relevance": 0.436391
  }
]

const terror2 = 

[
  {
    "text": "MI5 chief Britain",
    "relevance": 0.949181
  },
  {
    "text": "UK terror threat",
    "relevance": 0.834734
  },
  {
    "text": "Islamist extremists",
    "relevance": 0.680105
  },
  {
    "text": "murderous plots",
    "relevance": 0.634063
  },
  {
    "text": "terrorist offensive",
    "relevance": 0.630422
  },
  {
    "text": "successful bombings",
    "relevance": 0.595698
  },
  {
    "text": "high tempo",
    "relevance": 0.565309
  },
  {
    "text": "Andrew Parker",
    "relevance": 0.546005
  },
  {
    "text": "director general",
    "relevance": 0.527339
  },
  {
    "text": "Security Service",
    "relevance": 0.519989
  },
  {
    "text": "shootings",
    "relevance": 0.391267
  },
  {
    "text": "inception",
    "relevance": 0.381847
  },
  {
    "text": "pace",
    "relevance": 0.372186
  },
  {
    "text": "attack",
    "relevance": 0.357936
  },
  {
    "text": "scale",
    "relevance": 0.341724
  },
  {
    "text": "pool",
    "relevance": 0.340338
  },
  {
    "text": "point",
    "relevance": 0.339515
  },
  {
    "text": "head",
    "relevance": 0.339298
  }
]

//each story is an array of objects with contain a keyword and a relevance

 //a function which takes two stories and finds the intersection of their keywords
const powerCompare = (arr1, arr2) => {

 
  let key1 = _.pluck(arr1, "text");
  let key2 = _.pluck(arr2, "text");
  //we pluck out the text from each story and store them in two different arrays
  // console.log(key1,"THIS IS THE KEY1")
  key1 = key1.map((str) => {
    let power1 = getSets(str.toLowerCase().split(' '))
    //mapping over each string of keywords and getting all the different combinations of that string
    //e.g. if 'new york city' is is passed into getSets then it return 'new', 'new york' , 'york city' etc...
      .map(str => str.join(' '));
    return power1;
  })

  key2 = key2.map((str) => {
    let power2 = getSets(str.toLowerCase().split(' '))
      .map(str => str.join(' '));
    return power2;
  })
  return _.intersection(_.flatten(key1), _.flatten(key2))
  //we flatten nested arrays and find the intersection of all the keywords

}

//a function that should work for two arrays each with ten different stories
const getStories = (arr1, arr2) => {

  stories = {};
  count = 0;

  arr1.forEach((story1) => {
    arr2.forEach(story2 => {

      let thread = powerCompare(story1, story2);
      if (powerCompare(story1, story2).length > 0) {
        stories[count] = thread;
        count++;
      }
    })
  })

  return stories;
}

// console.log(getStories(arr1, arr2));
// console.log(getStories(weds,thurs));
// console.log(getStories(tues,weds));
// console.log(getStories(tues,thurs));
// console.log(getSets(["mogul","harvey","weinstein"]))
// console.log(powerCompare(terror1, terror2));
// console.log(getStories(newsCall1,newsCall2));
// console.log(powerCompare(["mogul","harvey","weinstein"],"producer harvey weinstein")) 
// console.log(getStories(arr1, arr2));
// console.log(getStories(tues, weds));
// console.log(getStories(tues, thurs));
// console.log(getStories(weds, thurs));

module.exports = powerCompare;