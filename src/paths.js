import createConfig from 'pqrs';

const routes = createConfig({
  routes: [
    {
      name: 'home',
      path: '/',
    },
    {
      name: 'swagger',
      path: '/swagger-ui',
    },
  ],
});

export default routes;
