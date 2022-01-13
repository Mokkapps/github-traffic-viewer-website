import React, { useEffect, useState } from 'react';
import { Button, CircularProgress } from 'react-md';

import Layout from '../layouts/layout';
import TrafficGraphs from '../components/TrafficGraphs';
import ContentCard from '../components/ContentCard';
import ErrorCard from '../components/ErrorCard';
import SignIn from '../components/SignIn';
import {
  getFirebaseRedirectResult,
  firebaseSignIn,
  firebaseSignOut,
} from '../firebase';

const IndexPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [graphData, setGraphData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    getFirebaseRedirectResult()
      .then((result) => {
        if (result) {
          const { graphData } = result;
          setGraphData(graphData);
        }
      })
      .catch((error) => {
        console.error('signInWithRedirect error', error);
        setGraphData(null);
        setError(`Error authenticating at GitHub: '${JSON.stringify(error)}'`);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const onSignIn = () => {
    firebaseSignIn();
  };

  const onSignOut = () => {
    firebaseSignOut()
      .then(() => {
        setGraphData(null);
        setError(null);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('signOut error', error);
        setGraphData(null);
        setError(`Error signing out from GitHub: '${JSON.stringify(error)}'`);
        setIsLoading(false);
      });
  };

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
            onClick={onSignOut}
          >
            Sign out
          </Button>
          <TrafficGraphs graphData={graphData} />
        </div>
      ) : (
        <ContentCard>
          <SignIn onSignIn={onSignIn} />
        </ContentCard>
      )}
    </Layout>
  );
};

export default IndexPage;
