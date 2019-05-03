import React from 'react';
import { Router } from '@reach/router';

const Home = () => <div>home</div>;
const Swagger = () => <div>swagger</div>;

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/swagger-ui',
    component: Swagger,
  },
];

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
