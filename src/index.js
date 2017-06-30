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

/* TODO: this is not a REST routing nor perfect but React router has limitations
  which of course can be addressed with writing a HOC component on top of the router to
  acknowledge type of dynamic props and not just naming as well as stripping the action verbs from
  the url to make the app REST compliant.
*/
const history = syncHistoryWithStore(browserHistory, routingStore);
ReactDOM.render(
  <Provider {...stores}>
    <Router history={history}>
      <App>
        <Switch>
          <Route path='/login' component={Login} />;
          <ProtectedRoute exact path='/' component={Home} />;
          <ProtectedRoute path='/product/:action/:id' component={Product} />;
          <ProtectedRoute path='/product/:id' component={Product} />;
          <Route component={NotFound}/>
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
