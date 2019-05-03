import React from 'react';
import paths from './paths';

const Home = () => <div>home</div>;
const Swagger = () => <div>swagger</div>;

const routes = [
  {
    path: paths.home.regex,
    component: Home,
  },
  {
    path: paths.swagger.regex,
    component: Swagger,
  },
];

export default routes.map(({ path, ...route }) => ({ path, key: path, ...route }));
