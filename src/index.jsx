import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import NavBar from "./components/NavBar";

const render = (Component) => {
  ReactDOM.render(
    <App />,
    document.getElementById('react-app-root')
  );
};
render(App);

