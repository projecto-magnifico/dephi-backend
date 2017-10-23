GET /threads
returns all threads

GET /threads/:id
returns key data of one thread by its id

GET /threads/:id/articles
returns details on all articles attached to a thread

GET /threads/:id/keywords
returns all keywords attached to a thread with relevance.

POST /threads
post a new thread

PATCH /threads/:id
update a thread with new information

GET /sources
returns a list of sources used with key details

GET /sources/:source
returns details on a particular news source

POST /sources
add details for a new source

PATCH /sources/:source
update details of the given source

GET /keywords
returns a list of keywords

GET /keywords/:keyword
returns details of the given keyword

GET /keywords/:category
returns a list of keywords that have been tagged with a certain category

POST /keywords
add a new keyword

PATCH /keywords/:keyword
update a keyword

PUT /keywords/:keyword/:category
add a category to a keyword

GET /users
returns a list of users

GET /users/:id
returns the user with the specified id

POST /users
add a new user

PATCH /users/:id
update details for a user

GET /quizzes
returns all quizzes

Queries:
?state=prepped - quizzes which have been created but not released yet
?state=open - quizzes which are currently open for polling
?state=waiting - quizzes which are closed for but waiting for the time to elapse for results
?state=pending - quizzes which have closed but haven't had results validated yet
?state=recent - quizzes with validated results from the last week
?tagged=:category - quizzes tagged with a particular category

GET /quizzes/:id
returns details on quiz with given id

GET /quizzes/:id/answers
returns all stored answers collections for a quiz

GET /quizzes/:id/answers/:index
returns all variations of the answers in a quiz collection

POST /quizzes
add a new quiz

PATCH /quizzes/:id
update details for the given quiz id

POST /quizzes/:id/answers
add a new answer category to a quiz

PUT /quizzes/:id/answers/:index
add a new answer to the given category