import React from 'react';
import { css } from 'react-emotion';
import firebase from 'firebase';
import { Container, Title, Button, Notification } from 'bloomer';
import ReactChartkick, { LineChart } from 'react-chartkick';
import Chart from 'chart.js';
import { DotLoader } from 'react-spinners';

const traffic = require('github-traffic');
ReactChartkick.addAdapter(Chart);

const GITHUB_API_URL = 'https://api.github.com';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class IndexPage extends React.Component {
  state = {
    token: null,
    username: null,
    graphData: null,
    isLoading: false,
    error: null
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    // Initialize Firebase
    const config = {
      apiKey: 'AIzaSyAYbPIy_MkmD3kWzobkKe1gyQL92lXJMTU',
      authDomain: 'github-traffic-website-545f4.firebaseapp.com',
      projectId: 'github-traffic-website-545f4'
    };
    firebase.initializeApp(config);

    // Handle OAuth redirect result
    firebase
      .auth()
      .getRedirectResult()
      .then(result => {
        const { credential, additionalUserInfo } = result;
        if (credential) {
          const { accessToken } = credential;
          this.setState({
            token: accessToken,
            username: additionalUserInfo.username
          });

          this.fetchRepoTraffic()
            .then(data => {
              this.setState({ isLoading: false, graphData: data });
            })
            .catch(error => {
              this.setState({
                token: null,
                username: null,
                isLoading: false,
                error: `Error fetching GitHub repo data: ${JSON.stringify(
                  error
                )}`
              });
            });
        } else {
          this.setState({ isLoading: false });
        }
      })
      .catch(error => {
        console.error('GitHub redirect error', error);
        const { code, message, credential, email } = error;
        this.setState({
          token: null,
          username: null,
          isLoading: false,
          error: `Error authenticating at GitHub: 'code: ${code}', message: '${message}', email: '${email}', credential: '${credential}'`
        });
      });
  }

  fetchRepoTraffic = () => {
    const { username, token } = this.state;

    const options = {
      username,
      token
    };

    return fetch(`${GITHUB_API_URL}/users/${username}/repos`)
      .then(res => res.json())
      .then(repos => {
        const repoNames = repos
          .filter(repo => !repo.fork)
          .map(repo => `${username}/${repo.name}`);

        return Promise.all(
          repoNames.map(name =>
            this.fetchGithubTrafficViews(name, { ...options })
          )
        );
      });
  };

  signIn = () => {
    const provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('repo');
    firebase.auth().signInWithRedirect(provider);
    this.setState({ isLoading: true });
  };

  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({
          token: null
        });
      })
      .catch(error => {
        console.error('GitHub sign out error', error);
        this.setState({
          token: null,
          error: `Error during sign out: ${JSON.stringify(error)}`
        });
      });
  };

  getGraphData = data => {
    const countsData = {};
    const uniquesData = {};

    for (const view of data.views) {
      const { timestamp, count, uniques } = view;
      countsData[timestamp] = count;
      uniquesData[timestamp] = uniques;
    }

    return [
      { name: 'Views', data: countsData },
      { name: 'Unique visitors', data: uniquesData }
    ];
  };

  fetchGithubTrafficViews = (repo, options) => {
    return new Promise((resolve, reject) => {
      traffic.views(repo, { ...options }, (err, results) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve({ ...results, name: repo });
      });
    });
  };

  getAuthenticatedView = (graphData, username) => (
    <Container>
      <Title isSize="1">{`${username} GitHub Traffic`}</Title>
      <Button onClick={this.signOut} isColor="info">
        Sign Out
      </Button>
      {graphData.map(data => {
        return (
          <Container style={{ margin: 20 }} key={data.name}>
            <Title isSize={2}>{data.name}</Title>
            <LineChart
              colors={['#FC1A20', '#333333']}
              curve={false}
              legend="bottom"
              data={this.getGraphData(data)}
            />
          </Container>
        );
      })}
    </Container>
  );

  getLoginView = () => (
    <Container>
      <Button onClick={this.signIn} isColor="info">
        Sign in to your GitHub account
      </Button>
      <p style={{ marginTop: 20 }}>
        You will get redirected to GitHub to grant access to read the traffic
        information from your repositories.
      </p>
    </Container>
  );

  render() {
    const { token, isLoading, error, graphData, username } = this.state;
    return (
      <Container hasTextAlign="centered">
        {error ? (
          <Notification isColor="danger">{this.state.error}</Notification>
        ) : null}
        {isLoading ? (
          <Container>
            <Title isSize="1">Loading...</Title>
            <DotLoader
              className={override}
              sizeUnit={'px'}
              size={150}
              color={'#FC1A20'}
              loading={true}
            />
          </Container>
        ) : token === null ? (
          this.getLoginView()
        ) : (
          this.getAuthenticatedView(graphData, username)
        )}
      </Container>
    );
  }
}

export default IndexPage;
