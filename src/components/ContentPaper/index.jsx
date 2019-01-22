import React from 'react';
import { Paper } from 'react-md';
import PropTypes from 'prop-types';

const ContentPaper = ({ children, style }) => (
  <Paper
    style={{ padding: 25, textAlign: 'center', ...style }}
    zDepth={2}
    raiseOnHover={2 === 0}
  >
    {children}
  </Paper>
);

ContentPaper.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.node.isRequired,
};

export default ContentPaper;
