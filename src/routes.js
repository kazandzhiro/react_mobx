import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

export default {
  '/': <Home />,
  '/login': <Login />,
  '/404': <NotFound />
}
