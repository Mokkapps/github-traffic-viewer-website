import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import { Configuration } from '@react-md/layout';

import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = ({ children, signedIn, onSignOut }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data) => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            {
              name: 'description',
              content:
                'A website which shows a list of traffic graphs of your own GitHub repositories.',
            },
            { name: 'keywords', content: 'website, github, traffic, viewer' },
          ]}
        >
          <html lang="en" />
          <link
            rel="stylesheet"
            defer
            async
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css"
            type="text/css"
          />
        </Helmet>
        <Configuration>
          <div className="layout-container">
            <Header
              signedIn={signedIn}
              onSignOut={() => onSignOut()}
              siteTitle={data.site.siteMetadata.title}
            />
            <div className="layout-content">{children}</div>
            <Footer />
          </div>
        </Configuration>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  signedIn: PropTypes.bool,
  onSignOut: PropTypes.func,
};

export default Layout;
