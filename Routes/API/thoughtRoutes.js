const router = require('express').Router();
const {
    getThoughts, getSingleThought,  createThought, updateThought,
    deleteThought,  createReaction, removeReaction
} = require('../../Controllers/thoughtControllers');

//Impliment user controllers as routes
router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(createReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;