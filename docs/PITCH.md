Our aim is to create an alternative way of consuming news and current affairs. We wish to push two boundaries that exist in current news provision - engagement and trust - as well as acting as a reflection of what the world is currently talking about.

The objectives we have in order to start addressing this aim are as follows:
• Retrieve, categorise and sort news articles from around the world in order to determine what the biggest stories are.
• Track these stories as they progress, algorithmically determining links.
• Provide interactive means for users to engage with these story threads, such as quizzes, associated data, links to multiple sources, and geographical and temporal visualisations.

The technology and structure of the project will tentatively be as follows:
• Automatic retrieval of news stories which are analysed and processed before relevant information is stored in databases. Information from subsequent retrievals is assimilated into the database, which is also programmed to decay older information.
• An admin interface that automatically prompts us to validate certain information, and create quizzes, source data and maintain the database.
• A front end with user accounts that presents the information via the database as well as storing predictions and any other analyses we approach.

We will approach the project by structuring our team to address the following challenges:
• A robust backend that automatically processes information from external API calls and stores it in an SQL database, and provides fetch methods via an internal Express API.
• An administration panel that acts as a mediator between the database and the front-end, allowing for some content to be validated or formatted before appearing on the user interface.
• A clean, easy to use and navigate front end with a modular presentation of content, game satistics and information visualisation.
• The admin panel and front end will be rendered by React and Redux.
• We intend to pair programme with minimal swapping between front end and back end to start with until we have built a complete chain from chron call to browser, then work on a ticketing system to develop the other features we hope to implement.

In brief, these are some of the issues we hope our project will address:
• Acknowledge bias in media whilst not seeking to bring the media into disrepute, through aggregation and a critical, non-editorial, statistical analysis.
• Encourage engagement and enjoyment. The hope is that interacting with visualisation will encourage a deeper understanding of how the news integrates with current affairs.
• Challenge readers perceptions, by gamifying content and encouraging them to revisit their previous beliefs when the news changes.
• Simplify content by presenting only key clean information, but make it easy for readers to educate themselves further too by linking to other content.