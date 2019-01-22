import React from 'react';
import { Toolbar, Button } from 'react-md';

const GITHUB_URL = 'https://github.com/Mokkapps/github-traffic-viewer-website';

const Header = () => (
  <Toolbar
    colored
    title="GitHub Traffic Viewer"
    actions={
      // eslint-disable-next-line react/jsx-wrap-multilines
      <Button flat secondary href={GITHUB_URL} iconClassName="fa fa-github">
        GitHub
      </Button>
    }
    style={{
      flex: 'none',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    }}
  />
);

export default Header;
