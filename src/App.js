import React from 'react';
import { Router } from '@reach/router';

import routes from './routes';

function App() {
  return (
    <Router>
      {routes.map(({ component: Component, ...props }) => (
        <Component {...props} />
      ))}
    </Router>
  );
}

export default App;
