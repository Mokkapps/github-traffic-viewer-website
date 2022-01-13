import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, AppBarTitle, AppBarAction } from '@react-md/app-bar';
import { ExitToAppSVGIcon } from '@react-md/material-icons';
import { Grid } from '@react-md/utils';

const Header = ({ signedIn, onSignOut }) => (
  <Grid clone padding={0} columns={1}>
    <AppBar theme="primary">
      <AppBarTitle style={{ color: 'white' }}>
        GitHub Traffic Viewer
      </AppBarTitle>
      {signedIn ? (
        <AppBarAction first aria-label="Sign Out" onClick={() => onSignOut()}>
          <ExitToAppSVGIcon />
        </AppBarAction>
      ) : null}
    </AppBar>
  </Grid>
);

Header.propTypes = {
  signedIn: PropTypes.bool,
  onSignOut: PropTypes.func,
};

export default Header;
