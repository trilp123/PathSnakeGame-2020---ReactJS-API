const Player = require('../models/Player');

module.exports = {
    async store(request, response) {
        const { user, password, email, birthdayDate } = request.body;

        const player = await Player.create({
            user,
            password,
            email,
            birthdayDate,
            highestScore: 0
        });

        return response.json(player);
    },

    async select(request, response) {
        result = await Player.findOne({
            user: request.headers['user'],
            password: request.headers['password']
        });

        response.send(result ? true : false);
    }
};