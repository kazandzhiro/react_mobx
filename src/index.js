import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';

import App from './components/App';
import Login from './pages/Login';
import Home from './pages/Home';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();

const stores = {
  routing: routingStore,
  // add more stroes
};

const history = syncHistoryWithStore(browserHistory, routingStore);

ReactDOM.render(
  <Provider {...stores}>
    <Router history={history}>
      <App>
        <Route exact path="/" component={Login} />
        <Route path="/home" component={Home} />
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
