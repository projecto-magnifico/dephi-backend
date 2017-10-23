const router = require('express').Router();
const { getAllKeywords, getKeyword, getKeywordsByCategory, defineNewKeyword, updateKeyword }

router.route('/')
    .get(getAllKeywords)
    .post(defineNewKeyword);
router.route('/:keyword')
    .get(getKeyword)
    .patch(updateKeyword);
router.get('/:category', getKeywordsByCategory);
router.put('/keyword/:category', addCategoryToKeyword);

module.exports = router;