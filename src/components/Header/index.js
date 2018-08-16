import React from 'react';
import Link from 'gatsby-link';
import {
  Icon,
  Navbar,
  NavbarMenu,
  NavbarStart,
  NavbarItem,
  NavbarEnd
} from 'bloomer';

const AppHeader = () => (
  <Navbar style={{ background: 'whitesmoke', margin: '0' }}>
    <NavbarMenu>
      <NavbarItem>
        <img
          src="https://avatars0.githubusercontent.com/u/3127210?s=460&v=4"
          style={{ marginRight: 5 }}
        />{' '}
        GitHub Traffic Viewer
      </NavbarItem>
      <NavbarEnd>
        <NavbarItem href="https://github.com/Mokkapps/github-traffic-website">
          <Icon className="fa fa-github" />
        </NavbarItem>
        <NavbarItem href="https://twitter.com/Mokkapps" isHidden="touch">
          <Icon className="fa fa-twitter" style={{ color: '#55acee' }} />
        </NavbarItem>
      </NavbarEnd>
    </NavbarMenu>
  </Navbar>
);

export default AppHeader;
