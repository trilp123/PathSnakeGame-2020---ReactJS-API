import React, { useState } from 'react';
import api from '../api';
import './Login.css';

import '../assets/fontawesome-free-5.13.0-web/css/all.css';

import $ from 'jquery';

export default function Login({ history }) {
    const [user, setUser] = useState();
    const [password, setPassword] = useState();

    function RegisterPage() {
        history.push('/register');
    }

    async function SignIn(e) {
        e.preventDefault();

        const response = await api.get('/players', {
            headers: {
                user,
                password,
            }
        })

        if (response.data) {
            localStorage.setItem('loggedPlayer', user);
            history.push('/game');
            window.location.reload();
        } else {
            alert('Player not found. Check your credencies');
        }

    }

    function Hide_help() {
        $('#container-help').hide(1500);
        $('form').show(1500);
    }

    function Show_help() {
        $('#container-help').show(1500);
        $('form').hide(1500);
    }

    function Show_ForgotPassWord() {
        $('form').hide(1500);
        $("#fogot_password").show(1500);
    }

    function Hide_ForgotPassWord() {
        $("#fogot_password").hide(1500);
        $('form').show(1500);
    }

    return (
        <div>

            <div id="container">

                <form onSubmit={SignIn}>

                    <h1>Entrar no PathSnake</h1>

                    <div className="container_input">
                        <i className="fas fa-user-alt fa-lg" alt="Ícone de usuário."></i>
                        <input
                            id="name"
                            placeholder=" Usuário"
                            type="text"
                            value={user}
                            onChange={e => setUser(e.target.value)}
                            required />
                    </div>

                    <div className="container_input">
                        <i className="fas fa-lock fa-lg" alt="Ícone de senha."></i>
                        <input
                            id="password"
                            placeholder=" Senha"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required />
                    </div>

                    <div id="container-sign-in">
                        <p onClick={Show_ForgotPassWord}>Recuperar senha</p>
                        <span>
                            <i className="fas fa-sign-in-alt" alt="Ícone ao lado do botão de login."></i>
                            <button>Entrar</button>
                        </span>
                    </div>

                    <div id="container-register">
                        <button onClick={RegisterPage} id="btn-register">Registrar</button>
                        <section id="copyright">© 2020 Web world. Todos os direitos reservados. Tema por PathSnake.</section>
                    </div>

                    <section id="footer_login">
                        <i className="far fa-question-circle" alt="Ícone para seção de comandos do jogo." onClick={Show_help}></i>
                    </section>

                </form>

                <section id="container-help">

                    <header>
                        <i className="fas fa-times-circle fa-lg" alt="Ícone para fechar a seção de comandos do jogo." onClick={Hide_help}></i>
                        
                        <h1>Ajuda PathSnake</h1>

                        <div id="controls_nd_objective">

                            <section id="controls">
                                <h3>Informações básicas</h3><br />
                                    ↑ : Subir<br />
                                    ↓ : Descer<br />
                                    ← : Esquerda<br />
                                    → : Direita <br />
                                    <br/>
                                    Evite se encostar para não morrer!
                                </section>

                            <section id="objective">
                                <h3>Objetivo</h3><br />
                                    Pegue o máximo de frutas possíveis, mas cuidado com o tamanho de seu corpo!
                                </section>
                        </div>
                    </header>
                </section>

                <section id="fogot_password">

                    <div id="header_fogot_password">
                        <i className="fas fa-times-circle fa-lg" alt="Ícone para fechar a seção de recuperação de conta." onClick={Hide_ForgotPassWord}></i>
                        <h5>Para recuperar sua conta, digite seu email abaixo:</h5>
                    </div>

                    <i className="fas fa-envelope fa-lg" alt="Ícone para registrar seu e-mail no input de recuperar senha."></i>
                    <input id="email_forgotPassWord" type="email" placeholder=" E-mail" required />
                    <button id="confirm_forgot">Confirmar</button>
                </section>
            </div>
        </div>
    );
}