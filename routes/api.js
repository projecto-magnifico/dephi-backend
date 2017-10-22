const router = require('express').Router();;
const threadsRouter = require('./threads');
const sourcesRouter = require('./sources');
const keywordsRouter = require('./keywords');
const usersRouter = require('./users');
const quizzesRouter = require('./quizzes');

router.use('/threads', threadsRouter);
router.use('/users', usersRouter);
router.use('/sources', sourcesRouter);
router.use('/keywords', keywordsRouter);
router.use('/quizzes', quizzesRouter);

module.exports = router;