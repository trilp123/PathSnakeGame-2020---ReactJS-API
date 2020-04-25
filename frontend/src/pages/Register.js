import React, { useState } from 'react';
import './Register.css';
import api from '../api';

export default function Register({ history }) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthdayDate, setBirthdayDate] = useState('');

    function Back() {
        history.push('/')
    }

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            user,
            password,
            email,
            birthdayDate,
        };
        try {
            await api.post('players', data);

            alert('Cadastro realizado com sucesso!')

            history.push('/');
        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
    }

    return (
        <div>

            <div id="container">

                <form onSubmit={handleRegister}>

                    <h1>Registro</h1>

                    <div className="container_input">
                        <i className="fas fa-user-alt fa-lg" alt="Ícone para registrar o usuário." ></i>
                        <input
                            type="text"
                            placeholder=" Usuário"
                            value={user}
                            onChange={e => setUser(e.target.value)}
                            required
                        />
                    </div>

                    <div className="container_input">
                        <i className="fas fa-lock fa-lg" alt="Ícone para registrar a senha."></i>
                        <input
                            type="password"
                            placeholder=" Senha"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="container_input">
                        <i className="fas fa-envelope fa-lg" alt="Ícone para registrar o email."></i>
                        <input
                            type="email"
                            placeholder=" E-mail"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className=" container_input">
                        <i className="fas fa-calendar-alt fa-lg" alt="Ícone para registrar a data de nascimento."></i>
                        <input
                            type="date"
                            value={birthdayDate}
                            onChange={e => setBirthdayDate(e.target.value)}
                            required
                        />
                    </div>

                    <section id="footer_default">
                        <button onClick={Back} id="btn-back">Voltar</button>
                        <button id="btn-next">Confirmar</button>
                    </section>

                </form>

            </div>

        </div>
    );
}