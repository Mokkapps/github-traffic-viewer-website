import React from 'react'
import { Paper } from 'react-md'

const ContentPaper = ({ children }) => (
  <Paper
    style={{ margin: 25, padding: 25, textAlign: 'center' }}
    zDepth={2}
    raiseOnHover={2 === 0}
  >
    {children}
  </Paper>
)

export default ContentPaper
