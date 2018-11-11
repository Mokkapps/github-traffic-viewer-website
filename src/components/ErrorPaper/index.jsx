import React from 'react'
import { Paper } from 'react-md'

const ErrorPaper = ({ children }) => (
  <Paper
    style={{ padding: 25, backgroundColor: 'red', color: 'white' }}
    zDepth={2}
    raiseOnHover={2 === 0}
  >
    {children}
  </Paper>
)

export default ErrorPaper
