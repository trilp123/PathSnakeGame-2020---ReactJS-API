const Player = require('../models/Player');

module.exports = {
    async update(request, response) {
        const { highestScore, user } = request.body;

        var result = await Player.findOne({
            user
        }, 'highestScore');

        if (result.highestScore < highestScore) {

            const player = await Player.updateOne({
                user
            }, {
                highestScore
            });

            return response.json(player);
        }
        return false;
    },
    async selectHighestScore(request, response) {
        const user = request.headers['user'];

        var result = await Player.findOne({
            user
        }, 'highestScore');

        return response.json(result);

    }
}