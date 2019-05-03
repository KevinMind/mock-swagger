import React from 'react';

const HomePage = props => (
  <div>
    <pre>{JSON.stringify(props, 0, 2)}</pre>
  </div>
);

export default HomePage;
