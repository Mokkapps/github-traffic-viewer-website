import React from 'react'
import { Paper } from 'react-md'

const ErrorPaper = ({ text }) => (
  <Paper
    style={{ margin: 25, padding: 25, backgroundColor: 'red', color: 'white' }}
    zDepth={2}
    raiseOnHover={2 === 0}
  >
    {text}
  </Paper>
)

export default ErrorPaper
