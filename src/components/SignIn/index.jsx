import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-md';

const SignIn = ({ onSignIn }) => (
  <div>
    <Button
      style={{ height: '100%', color: 'white' }}
      theme="primary"
      themeType="contained"
      onClick={() => onSignIn()}
    >
      Sign in to your GitHub account
    </Button>
    <p style={{ marginTop: 20 }}>
      You will get redirected to GitHub to grant access to read the traffic
      information from your repositories.
    </p>
  </div>
);

SignIn.propTypes = {
  onSignIn: PropTypes.func.isRequired,
};

export default SignIn;
