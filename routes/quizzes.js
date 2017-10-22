const router = require('express').Router();
const { getAllQuizzes, getQuizById, getQuizAnswers, getQuizAnswersInIndex, addNewQuiz, updateQuiz, addAnswerCategory, addVariationToAnswerCategory }

router.route('/')
    .get(getAllQuizzes)
    .post(addNewQuiz);
router.route('/:id')
    .get(getQuizById)
    .patch(updateQuiz);
router.route('/:id/answers')
    .get(getQuizAnswers)
    .post(addAnswerCategory);
router.route('/:id/answers/:index')
    .get(getQuizAnswersInIndex)
    .put(addVariationToAnswerCategory);

module.exports = router;