import React from 'react';

import { SwaggerUi } from '../../components';
import config from '../../config';

const SwaggerUiPage = props => (
  <div>
    <pre>{JSON.stringify(props, 0, 2)}</pre>
    <SwaggerUi url={config.SWAGGER_API_URL} />
  </div>
);

export default SwaggerUiPage;
