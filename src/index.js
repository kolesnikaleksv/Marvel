import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import MarvelService from './services/MarvelService';

import './style/style.scss';

const newMarvelService = new MarvelService();

// newMarvelService.getAllCaracters().then(res => console.log(res.data.results));
newMarvelService.getAllCaracters().then(res => res.data.results.forEach(item => console.log(item.name)));

newMarvelService.getCaracter(1010338).then(res => console.log(res));


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

