const router = require('express').Router();
const { getAllUsers, getUserById, addNewUser, updateUser }

router.route('/')
    .get(getAllUsers)
    .post(addNewUser);
router.route('/:id')
    .get(getUserById)
    .patch(updateUser);

module.exports = router;