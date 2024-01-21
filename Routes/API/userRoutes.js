const router = require('express').Router();
const {
  getUsers, getSingleUser, createUser,
  updateUser,  deleteUser, addFriend, removeFriend
} = require('../../Controllers/userControllers');

//Impliment user controllers as routes
router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').delete(removeFriend).post(addFriend);

module.exports = router;