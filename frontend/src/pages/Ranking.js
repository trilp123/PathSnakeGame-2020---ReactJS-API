import React from 'react';
import './Ranking.css';

export default function Ranking({ history }) {


    function PlayAgain() {
        history.push('/game');
        window.location.reload();
    }

    function BackToScore() {
        history.push('/score');
    }

    return (
        <div>
            <div id="container">

                <form>
                    <div id="header_button">
                        <button id="btn-to-score" onClick={BackToScore}>Pontuação</button>
                        <button id="btn-play_again" onClick={PlayAgain}>Jogar novamente</button>
                    </div>

                    <h4>Classificação de jogadores</h4>

                    <table border="1px solid rgba(255, 255, 255, 0.562)" cellSpacing="0">

                        <tr>
                            <td>Colocação</td>
                            <td>Nome</td>
                            <td>Pontuação total</td>
                        </tr>

                        <tr>
                            <td><i className="fas fa-medal fa-1x" id="fst_medal"></i></td>
                            <td>Jogador 1</td>
                            <td>100</td>
                        </tr>

                        <tr>
                            <td><i className="fas fa-medal fa-1x" id="scnd_medal"></i></td>
                            <td>Jogador 2</td>
                            <td>80</td>
                        </tr>

                        <tr>
                            <td><i className="fas fa-medal fa-1x " id="thd_medal"></i></td>
                            <td>Jogador 3</td>
                            <td>70</td>
                        </tr>

                        <tr>
                            <td>4</td>
                            <td>Jogador 4</td>
                            <td>60</td>
                        </tr>

                        <tr>
                            <td>5</td>
                            <td>Jogador 5</td>
                            <td>50</td>
                        </tr>
                    </table>
                </form>
            </div>
        </div>
    );
}