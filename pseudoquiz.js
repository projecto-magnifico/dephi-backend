/*

admin page
- alert on news stories passed in
    * calls on story threads that have a high rolling relevance over the last 24hrs
- question whether to publish a quiz on stories meeting relevance (can delay / discount)
- if accepting, preview template (e.g. what will be happening... / which will have happened)
    ...set window for voting
    ...set revisit date
    ...stage for release
    ...add basic answers
- calendar
    ...alerts on upcoming dates
    ...set upcoming dates
- current top 20 stories with relevance scores and places moved.

display
- news tiles for current stories
- top 10 stories tracked over the last week
- globe visualisation

quiz database entry:
- id
- keywords
- voted on date
- release date
- revisited dates
- next revisit date
- current / next voting window
- potential answers (from comparison)
- times voted on

story thread entry:
- id
- keywords, decay on each call
- tail story (1st)
- head stories & links (delete after 1 week)

if new story keywords match on threshhold with a current story thread, 

*/