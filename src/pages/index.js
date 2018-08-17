import React from 'react'
import { CircularProgress } from 'react-md'

import Layout from '../layouts/layout'
import TrafficGraphs from '../components/TrafficGraphs'

import {
  initFirebase,
  getFirebaseRedirectResult,
  signInWithRedirect,
} from '../firebase'
import SignIn from '../components/SignIn'

class IndexPage extends React.Component {
  state = {
    isLoading: false,
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

  render() {
    const { isLoading, graphData } = this.state
    return (
      <Layout>
        {isLoading ? (
          <CircularProgress scale={2} id="LoadingIndicator" />
        ) : null}
        {graphData ? (
          <TrafficGraphs graphData={graphData} />
        ) : (
          <SignIn onSignIn={this.onSignIn} />
        )}
      </Layout>
    )
  }
}

export default IndexPage
