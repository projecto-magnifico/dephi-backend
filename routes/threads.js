const router = require('express').Router();
const { getAllThreads, getThreadById, getThreadArticles, getThreadKeywords, createNewThread, updateThread }

router.route('/')
    .get(getAllThreads)
    .post(createNewThread);
router.route('/:id')
    .get(getThreadById)
    .patch(updateThread);
router.get('/:id/articles', getThreadArticles);
router.get('/:id/keywords', getThreadKeywords);

module.exports = router;