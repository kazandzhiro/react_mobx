import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';

import Store from './stores';
import App from './components/App';
import Login from './pages/Login';
import Home from './pages/Home';
import Product from './pages/Product';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/Auth';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();

const stores = {
  routing: routingStore,
  store: new Store()
};

const history = syncHistoryWithStore(browserHistory, routingStore);
ReactDOM.render(
  <Provider {...stores}>
    <Router history={history}>
      <App>
        <Switch>
          <Route path='/login' component={Login} />;
          <Route exact path='/' component={Home} />;
          <Switch>
            <Route path='/product/:action/:id' component={Product} />;
            <Route path='/product/:id' component={Product} />;
          </Switch>
          <Route component={NotFound}/>
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
