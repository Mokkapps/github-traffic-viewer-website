/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Button, CircularProgress } from 'react-md';

import Layout from '../layouts/layout';
import TrafficGraphs from '../components/TrafficGraphs';
import ContentCard from '../components/ContentCard';
import ErrorCard from '../components/ErrorCard';
import SignIn from '../components/SignIn';
import {
  initFirebase,
  getFirebaseRedirectResult,
  signInWithRedirect,
  signOut,
} from '../firebase';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      graphData: null,
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    initFirebase();

    getFirebaseRedirectResult()
      .then((result) => {
        if (!result) {
          this.setState({ isLoading: false });
        } else {
          const { graphData } = result;
          this.setState({ isLoading: false, graphData });
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('signInWithRedirect error', error);
        this.setState({
          graphData: null,
          isLoading: false,
          error: `Error authenticating at GitHub: '${JSON.stringify(error)}'`,
        });
      });
  }

  onSignIn = () => {
    signInWithRedirect();
  };

  onSignOut = () => {
    signOut()
      .then(() => {
        this.setState({
          graphData: null,
          isLoading: false,
          error: null,
        });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('signOut error', error);
        this.setState({
          graphData: null,
          isLoading: false,
          error: `Error signing out from GitHub: '${JSON.stringify(error)}'`,
        });
      });
  };

  render() {
    const { isLoading, graphData, error } = this.state;
    return (
      <Layout>
        {error ? <ErrorCard>{error}</ErrorCard> : null}
        {isLoading ? (
          <ContentCard>
            <CircularProgress scale={2} id="LoadingIndicator" />
            <h1>Loading...</h1>
          </ContentCard>
        ) : graphData ? (
          <div style={{ textAlign: 'center' }}>
            <Button
              theme="secondary"
              themeType="contained"
              style={{ width: '100%', height: 50, marginBottom: 25 }}
              onClick={this.onSignOut}
            >
              Sign out
            </Button>
            <TrafficGraphs graphData={graphData} />
          </div>
        ) : (
          <ContentCard>
            <SignIn onSignIn={this.onSignIn} />
          </ContentCard>
        )}
      </Layout>
    );
  }
}

export default IndexPage;
