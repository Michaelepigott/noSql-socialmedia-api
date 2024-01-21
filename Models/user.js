const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            validate: {
                validator: function (value) {
                    //test email format
                    const emailRegex = /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/;
                    return emailRegex.test(value);
                },
                message: 'Invalid email address',
            },
        },
        //attatch user's thought to them 
        thoughts:
            [{
                type: Schema.Types.ObjectId,
                ref: "Thought"
            }],
            //attach freinds to user
        friends:
            [
                {
                    type: Schema.Types.ObjectId,
                    ref: "User"
                }],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);
//Amount of freinds
userSchema.virtual("friendAmount").get(function () {
    return this.friends.length;
});

const User = model("User", userSchema);


module.exports = User;