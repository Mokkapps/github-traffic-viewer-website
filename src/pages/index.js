import React from 'react'
import { Button, CircularProgress } from 'react-md'

import Layout from '../layouts/layout'
import TrafficGraphs from '../components/TrafficGraphs'
import ContentPaper from '../components/ContentPaper'
import ErrorPaper from '../components/ErrorPaper'
import SignIn from '../components/SignIn'
import {
  initFirebase,
  getFirebaseRedirectResult,
  signInWithRedirect,
  signOut,
} from '../firebase'

class IndexPage extends React.Component {
  state = {
    graphData: null,
    username: null,
    isLoading: false,
    error: null,
  }

  componentDidMount() {
    this.setState({ isLoading: true })

    initFirebase()

    getFirebaseRedirectResult()
      .then(result => {
        console.log('firebase result', result)
        if (!result) {
          this.setState({ isLoading: false })
        } else {
          const { graphData, username } = result
          this.setState({ isLoading: false, graphData, username })
        }
      })
      .catch(error => {
        console.error('signInWithRedirect error', error)
        this.setState({
          graphData: null,
          username: null,
          isLoading: false,
          error: `Error authenticating at GitHub: '${JSON.stringify(error)}'`,
        })
      })
  }

  onSignIn = () => {
    signInWithRedirect()
  }

  onSignOut = () => {
    signOut()
      .then(() => {
        this.setState({
          graphData: null,
          username: null,
          isLoading: false,
          error: null,
        })
      })
      .catch(error => {
        console.error('signOut error', error)
        this.setState({
          graphData: null,
          username: null,
          isLoading: false,
          error: `Error signing out from GitHub: '${JSON.stringify(error)}'`,
        })
      })
  }

  render() {
    const { isLoading, graphData, error } = this.state
    return (
      <Layout>
        {error ? <ErrorPaper>{error}</ErrorPaper> : null}
        {isLoading ? (
          <ContentPaper>
            <CircularProgress scale={2} id="LoadingIndicator" />
            <h1>Loading...</h1>
          </ContentPaper>
        ) : graphData ? (
          <div style={{ textAlign: 'center', margin: 20 }}>
            <Button
              style={{ width: 400, height: 50 }}
              secondary
              onClick={this.onSignOut}
              raised
            >
              Sign out
            </Button>
            <TrafficGraphs graphData={graphData} />
          </div>
        ) : (
          <ContentPaper>
            <SignIn onSignIn={this.onSignIn} />
          </ContentPaper>
        )}
      </Layout>
    )
  }
}

export default IndexPage
