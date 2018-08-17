import React from 'react'

import { Toolbar, Avatar, Button } from 'react-md'

const GITHUB_URL = 'https://github.com/Mokkapps/github-traffic-viewer-website'

const Header = () => (
  <Toolbar
    colored
    nav={
      <a href="https://www.mokkapps.de">
        <Avatar src="https://avatars0.githubusercontent.com/u/3127210?s=460&v=4" />
      </a>
    }
    title="GitHub Traffic Viewer"
    actions={
      <Button flat secondary href={GITHUB_URL} iconClassName="fa fa-github">
        GitHub
      </Button>
    }
  />
)

export default Header
