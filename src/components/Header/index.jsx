import React from 'react';
import { AppBar, AppBarTitle } from 'react-md';
import { Grid } from '@react-md/utils';

const Header = () => (
  <Grid clone padding={0} columns={1}>
    <AppBar theme="primary">
      <AppBarTitle style={{ color: 'white' }}>
        GitHub Traffic Viewer
      </AppBarTitle>
    </AppBar>
  </Grid>
);

export default Header;
