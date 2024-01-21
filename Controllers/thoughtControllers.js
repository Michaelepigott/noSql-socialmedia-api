const { Thought, User } = require('../Models');

module.exports = {

    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findById(req.body.userId);
            user.thoughts.push(thought);
            await user.save();

            res.json(thought);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    // Update a thought
    async updateThought(req, res) {
        try {

            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId, userId: req.body._id }, 
                { $set: req.body },
                { new: true }

            );
            console.log(req)
            if (!thought) {
                res.status(404).json({ message: 'Thought not found' });
            }
            res.json(thought);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },
    // Delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete(
                { _id: req.params.thoughtId, userId: req.body._id });

            if (!thought) {
                res.status(404).json({ message: 'Thought not found' });
            }

            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({
                    message: 'Thought not found, thought cannot be deleted',
                });
            }
        res.json({ message: 'Thought deleted' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // add a reaction
    async createReaction(req, res) {

        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }

            );

            if (!thought) {
                return res
                    .status(404)
                    .json({ message: 'Thought not found' });
            }

            res.json(thought);
        } catch (err) {

            res.status(500).json(err);
        }
    },
    // Delete a reaction
    async removeReaction(req, res) {
        try {

            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res
                  .status(404)
                  .json({ message: 'Thought not found' });
              }

            res.json({ message: 'Reaction deleted' });
        } catch (err) {

            res.status(500).json(err);
        }
    },
};