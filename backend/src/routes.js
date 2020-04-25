const express = require('express');

const routes = express.Router();

const PlayerController = require('./controllers/PlayerController')
const ScoreController = require('./controllers/ScoreController')

routes.post('/players', PlayerController.store);
routes.get('/players', PlayerController.select);
routes.post('/score', ScoreController.update);
routes.get('/score', ScoreController.selectHighestScore);

module.exports = routes;