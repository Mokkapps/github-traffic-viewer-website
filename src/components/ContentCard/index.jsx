import React from 'react';
import { Card } from 'react-md';
import PropTypes from 'prop-types';

const ContentCard = ({ children, style }) => (
  <Card
    style={{
      width: '100%', padding: 25, textAlign: 'center', ...style
    }}
    zDepth={2}
    raiseOnHover={2 === 0}
  >
    {children}
  </Card>
);

ContentCard.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

export default ContentCard;
