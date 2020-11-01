import React from 'react';
import { Card } from 'react-md';
import PropTypes from 'prop-types';

const ErrorCard = ({ children }) => (
  <Card
    style={{ padding: 25, backgroundColor: 'red', color: 'white' }}
    zDepth={2}
    raiseOnHover={2 === 0}
  >
    {children}
  </Card>
);

ErrorCard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorCard;
