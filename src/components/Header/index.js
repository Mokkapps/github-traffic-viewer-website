import React from 'react'

import { Toolbar, Avatar, Button } from 'react-md'

const GITHUB_URL = 'https://github.com/Mokkapps/github-traffic-viewer-website'

const Header = () => (
  <Toolbar
    colored
    nav={
      <Avatar src="https://avatars0.githubusercontent.com/u/3127210?s=460&v=4" />
    }
    title="GitHub Traffic Viewer"
    actions={<Button icon href={GITHUB_URL} iconClassName="fa fa-github" />}
  />
)

export default Header
