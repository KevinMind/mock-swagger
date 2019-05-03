import paths from './paths';

import { HomePage, SwaggerUiPage } from './pages';

const routes = [
  {
    path: paths.home.regex,
    component: HomePage,
  },
  {
    path: paths.swagger.regex,
    component: SwaggerUiPage,
  },
];

export default routes.map(({ path, ...route }) => ({ path, key: path, ...route }));
