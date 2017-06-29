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
    <App>
      <Router history={history}>
        <Switch>
          <Route path='/login' component={Login} />;
          <ProtectedRoute exact path='/' component={Home} />;
          <Route component={NotFound}/>
        </Switch>
      </Router>
    </App>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();

// <RoutesAuth path="/" routes={routes}/>
