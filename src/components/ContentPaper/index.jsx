import React from 'react'
import { Paper } from 'react-md'

const ContentPaper = ({ children, style }) => (
  <Paper
    style={{ padding: 25, textAlign: 'center', ...style }}
    zDepth={2}
    raiseOnHover={2 === 0}
  >
    {children}
  </Paper>
)

export default ContentPaper
