import {
  getAuth,
  signInWithPopup,
  signOut,
  GithubAuthProvider,
} from 'firebase/auth';

const auth = getAuth();
const provider = new GithubAuthProvider();
provider.addScope('repo');

export const firebaseSignIn = () => {
  return new Promise((resolve, reject) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);

        if (!credential) {
          resolve(null);
        }

        if (credential) {
          const token = credential.accessToken;
          const user = result.user;
          const username = user.reloadUserInfo.screenName;

          resolve({ username, token });
        }
      })
      .catch((error) => reject(error));
  });
};

export const firebaseSignOut = () => signOut(auth);
