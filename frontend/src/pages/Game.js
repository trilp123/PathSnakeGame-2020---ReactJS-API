import React from 'react';
import api from '../api';
import './Game.css';

import $ from 'jquery'

export default function Game({ history }) {

    class createSnake {
        constructor(gameContext, gameDiv, gameBack) {
            this.gameContext = gameContext;
            this.gameDiv = gameDiv;
            this.gameBack = gameBack;
            this.snakeX = 4;
            this.snakeY = this.snakeX;
            this.vel = 1;
            this.velX = this.vel;
            this.velY = 0;
            this.permision = false;
            this.snakeTrail = [{ "x": this.snakeX, "y": this.snakeY }];
        }

        setTrail() {
            ;
            let i = this.snakeTrail.length - 1;

            for (i; i >= 0; i--) {
                if (i !== 0) {
                    this.snakeTrail[i] = this.snakeTrail[i - 1];
                } else {
                    this.snakeTrail[0] = { "x": this.snakeX, "y": this.snakeY };
                }
            }

        }

        clearSnake() {
            while (this.snakeTrail.length > 1) {
                this.snakeTrail.pop();
            }
        }

        lose() {
            for (let i = 0; i < this.snakeTrail.length; i++) {
                if (i !== 0 && this.snakeTrail[0].x === this.snakeTrail[i].x && this.snakeTrail[0].y === this.snakeTrail[i].y) {

                    this.velX = this.velY = 0;
                    this.gameBack.lose = true;
                    this.gameBack.oldScore = parseInt(this.gameBack.score);
                    this.gameBack.score = 0;
                    this.clearSnake();

                    return true;
                }
            }

        }

        draw() {
            this.moveSnake();
            this.setTrail();
            this.lose();

            for (let i = 0; i < this.snakeTrail.length; i++) {
                if (i === 0) {
                    this.gameContext.fillStyle = "rgba(255, 255, 255, 0.562)";
                } else {
                    this.gameContext.fillStyle = "#9a187a";
                }
                this.gameContext.fillRect(this.snakeTrail[i].x * this.gameDiv, this.snakeTrail[i].y * this.gameDiv, this.gameDiv - 2, this.gameDiv - 2);
            }
        }

        setVel(theKeyCode) {

            let setXY = (x, y) => {
                this.velX = x;
                this.velY = y;
            }
            if (!this.gameBack.lose) {

                if ((theKeyCode === 37 || theKeyCode === 65) && this.permision) {//left
                    setXY(-this.vel, 0);
                    this.permision = !this.permision;
                } else if ((theKeyCode === 38 || theKeyCode === 87) && !this.permision) {//up
                    setXY(0, -this.vel);
                    this.permision = !this.permision;
                } else if ((theKeyCode === 39 || theKeyCode === 68) && this.permision) {//right
                    setXY(this.vel, 0);
                    this.permision = !this.permision;
                } else if ((theKeyCode === 40 || theKeyCode === 83) && !this.permision) {//down
                    setXY(0, this.vel);
                    this.permision = !this.permision;
                }

            } else if (theKeyCode === 32) {
                this.gameBack.lose = false;
                this.velX = this.vel;
                this.permision = false;
            }

        }

        moveSnake() {
            this.snakeX += this.velX;
            this.snakeY += this.velY;

            if (this.snakeX > 19) {
                this.snakeX = 0;
            } else if (this.snakeX < 0) {
                this.snakeX = 19;
            }

            if (this.snakeY > 19) {
                this.snakeY = 0;
            } else if (this.snakeY < 0) {
                this.snakeY = 19;
            }
        }
    }

    class createApple {
        constructor(snake, gameContext, gameDiv, gameBack) {
            this.snake = snake;
            this.gameContext = gameContext;
            this.gameDiv = gameDiv;
            this.gameBack = gameBack;
            this.appleX = 15;
            this.appleY = 15;
        }

        gotEat() {
            if (this.appleX === this.snake.snakeTrail[0].x && this.appleY === this.snake.snakeTrail[0].y) {

                this.snake.snakeTrail.push({ "x": '', "y": '' });
                var points = this.gameBack.score += 1;
                localStorage.setItem('points', points);
                this.appleX = Math.floor(Math.random() * 20);
                this.appleY = Math.floor(Math.random() * 20);

                return points;
            }
        }

        draw() {
            this.gotEat();
            this.gameContext.fillStyle = "#632367";
            this.gameContext.beginPath();
            this.gameContext.arc((this.appleX * this.gameDiv) + (this.gameDiv / 2), (this.appleY * this.gameDiv) + (this.gameDiv / 2), this.gameDiv / 2.5, 0, 2 * Math.PI);
            this.gameContext.fill();
        }
    }

    class createGameBack {
        constructor(gameContext, gameWindow) {
            this.gameContext = gameContext;
            this.gameWindow = gameWindow;
            this.score = 0;
            this.lose = false;
            this.oldScore = 0;
        }

        async draw() {
            this.gameContext.fillStyle = "rgba(0, 0, 0, 0.733)";
            this.gameContext.fillRect(0, 0, this.gameWindow.width, this.gameWindow.height);

            this.gameContext.fillStyle = '#fff';
            this.gameContext.font = "12pt Arial";
            this.gameContext.fillText("Pontos:", 394, 19);
            this.gameContext.fillText(this.score, 450, 20);

            if (this.lose) {

                api.post('/score', {
                    user: localStorage.getItem('loggedPlayer'),
                    highestScore: localStorage.getItem('points'),
                })

                $('canvas').hide();
                window.location.reload();
                history.push('/score');
            }
        }
    }

    function createCanvas(app, width, height) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        app.appendChild(canvas);
        return canvas;
    }

    window.onload = () => {

        const app = document.getElementById('root');
        const gameWindow = createCanvas(app, 500, 500);
        const gameContext = gameWindow.getContext('2d');
        const gameDiv = 25;

        const gameBack = new createGameBack(gameContext, gameWindow);
        const snake = new createSnake(gameContext, gameDiv, gameBack);
        const apple = new createApple(snake, gameContext, gameDiv, gameBack);

        setInterval(function () {
            gameBack.draw();
            snake.draw();
            apple.draw();
        }, 120);

        document.addEventListener('keydown', (event) => {
            console.log(event.keyCode);
            snake.setVel(event.keyCode);
        });
    }

    function Back() {
        history.push('/');
        window.location.reload();
    }

    function Game_to_rank() {
        history.push('/ranking');
        window.location.reload();
    }

    return (

        <div>

            <div id="container">

                <form>
                    <h4>
                        Path Snake
                        <i className="fas fa-medal fa-1x" id="medal_to_ranking" onClick={Game_to_rank}></i>
                        <i className="fas fa-times-circle fa-1x" alt="Icon for close help commands section" id="btn-close-game" onClick={Back}></i>
                    </h4>

                </form>
            </div>
        </div>
    );
}
