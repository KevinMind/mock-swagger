import React from 'react';
import PropTypes from 'prop-types';
import SUI from 'swagger-ui-react';

import 'swagger-ui-react/swagger-ui.css';

const SwaggerUi = ({ url }) => <SUI url={url} />;

SwaggerUi.propTypes = {
  url: PropTypes.string.isRequired,
};

export default SwaggerUi;
