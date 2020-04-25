const { Schema, model } = require('mongoose');

const PlayerSchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    birthdayDate: {
        type: Date,
        required: true,
    },
    highestScore: {
        type: Number,
        ref: 'Player'
    }
}, {
    timestamps: true
});

module.exports = model('Player', PlayerSchema);