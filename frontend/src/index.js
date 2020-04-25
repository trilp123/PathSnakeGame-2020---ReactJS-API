import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import MusicBackground from './assets/music_background.mp3';

import BackgroundImg from './assets/gif_fundo.gif';


ReactDOM.render(
  <React.StrictMode>
    <App />

    <audio src={MusicBackground} autoPlay loop={true}/>
    <img src={BackgroundImg} alt="Background" />

  </React.StrictMode>,
  document.getElementById('root')
);