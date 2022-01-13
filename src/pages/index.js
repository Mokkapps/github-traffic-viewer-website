import React, { useState } from 'react';
import { CircularProgress } from 'react-md';

import Layout from '../layouts/layout';
import TrafficGraphs from '../components/TrafficGraphs';
import ContentCard from '../components/ContentCard';
import ErrorCard from '../components/ErrorCard';
import SignIn from '../components/SignIn';
import { firebaseSignIn, firebaseSignOut } from '../firebase';
import fetchRepoTraffic from '../trafficFetcher';

const IndexPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [graphData, setGraphData] = useState(null);
  const [error, setError] = useState(null);

  const onSignIn = async () => {
    try {
      setIsLoading(true);

      const data = await firebaseSignIn();

      if (!data) {
        setGraphData(null);
        setIsLoading(false);
        return;
      }

      setIsSignedIn(true);
      const { username, token } = data;

      fetchRepoTraffic(username, token)
        .then((trafficData) => {
          setGraphData(trafficData);
          setIsLoading(false);
        })
        .catch((error) => {
          setGraphData(null);
          setError(`Failed to load GitHub traffic: '${JSON.stringify(error)}'`);
        })
        .finally(() => setIsLoading(false));
    } catch (error) {
      console.error('signIn error', error);
      setGraphData(null);
      setError(`Error signing into GitHub: '${JSON.stringify(error)}'`);
      setIsLoading(false);
    }
  };

  const onSignOut = () => {
    firebaseSignOut()
      .then(() => {
        setIsSignedIn(true);

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
    <Layout signedIn={isSignedIn} onSignOut={onSignOut}>
      {error ? <ErrorCard>{error}</ErrorCard> : null}
      {isLoading ? (
        <ContentCard>
          <CircularProgress scale={2} id="LoadingIndicator" />
          <h1>Loading...</h1>
        </ContentCard>
      ) : graphData ? (
        <div style={{ textAlign: 'center' }}>
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
