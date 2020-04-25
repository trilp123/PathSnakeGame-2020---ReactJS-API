import React from 'react';
import ReactDOM from 'react-dom'
import './Score.css';
import api from '../api';

export default function Score({ history }) {
    var result;
    const points = localStorage.getItem('points');
    const user = localStorage.getItem('loggedPlayer');

    api.get('/score', {
        headers: {
            user
        }
    }).then(res => {
        result = res.data.highestScore;
        const span = <h2>{result}</h2>
        ReactDOM.render(span, document.getElementById('highestScoreId'));
    })

    function PlayAgain() {
        history.push('/game');

        window.location.reload();
    }

    function MainMenu() {
        history.push('/');
    }

    function Score_Ranking() {
        history.push('/ranking')
    }

    return (
        <div>

            <div id="container">
                <form>
                    <div id="header_button">
                        <button id="score_to_ranking" onClick={Score_Ranking}>Ranking</button>
                    </div>

                    <h6>Pontuação</h6>

                    <h1>Pontuação anterior</h1>
                    <h2>{points}</h2>
                    <h1>Recorde de pontuação</h1>
                    <h1 id="highestScoreId"></h1>

                    <div id="footer_default">
                        <button onClick={PlayAgain} id="btn-next-score">Jogar novamente</button>
                        <button onClick={MainMenu} id="btn-back-score">Sair</button>
                    </div>
                </form>
            </div>
        </div>
    );
}