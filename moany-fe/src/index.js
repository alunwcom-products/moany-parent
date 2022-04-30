import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

// TODO restore default page render - but create loading component to catch any connectivity issues
ReactDOM.render(<App />, document.getElementById('root'));
// const renderApp = () => ReactDOM.render(<App/>, document.getElementById("root"));
// UserService.initKeycloak(renderApp);
registerServiceWorker();
