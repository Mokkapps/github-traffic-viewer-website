import {
  getAuth,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  GithubAuthProvider,
} from 'firebase/auth';

import fetchRepoTraffic from './trafficFetcher';

const auth = getAuth();
const provider = new GithubAuthProvider();
provider.addScope('repo');

export const firebaseSignIn = () => signInWithRedirect(auth, provider);

export const firebaseSignOut = async () => signOut();

export const getFirebaseRedirectResult = async () =>
  new Promise((resolve, reject) => {
    getRedirectResult(auth)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);

        if (!credential) {
          resolve();
        }

        if (credential) {
          const token = credential.accessToken;
          const user = result.user;

          const username = user.reloadUserInfo.screenName;

          fetchRepoTraffic(username, token)
            .then((trafficData) => {
              resolve({ graphData: trafficData, username });
            })
            .catch((error) => reject(error));
        }
      })
      .catch((error) => reject(error));
  });
