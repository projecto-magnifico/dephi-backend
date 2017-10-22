const router = require('express').Router();
const { getAllSources, getSource, defineNewSource, updateSource }

router.route('/')
    .get(getAllSources)
    .post(defineNewSource);
router.route('/:source')
    .get(getSource)
    .patch(updateSource);

module.exports = router;