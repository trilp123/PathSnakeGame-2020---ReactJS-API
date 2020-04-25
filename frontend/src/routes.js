import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './pages/Login'
import Register from './pages/Register';
import Ranking from './pages/Ranking';
import Score from './pages/Score';
import Game from './pages/Game';

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/ranking" component={Ranking} />
            <Route path="/score" component={Score} />
            <Route path="/game" component={Game} />
        </BrowserRouter>
    );
}