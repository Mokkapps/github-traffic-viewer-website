import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import 'font-awesome/css/font-awesome.css';
import './all.sass';

import {
  Container,
  Hero,
  HeroHeader,
  HeroBody,
  HeroFooter,
  Tabs,
  TabList,
  Tab,
  TabLink
} from 'bloomer';
import AppHeader from '../components/Header';
import AppFooter from '../components/Footer';

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="GitHub Traffic Viewer" />
    <AppHeader />
    <Hero isFullHeight isColor="white">
      <HeroBody>{children()}</HeroBody>
    </Hero>
    <AppFooter />
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;
