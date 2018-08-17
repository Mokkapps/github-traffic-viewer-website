import firebase from 'firebase/app'
import 'firebase/auth';
import { fetchRepoTraffic } from './trafficFetcher'

export const initFirebase = () => {
  const config = {
    apiKey: 'AIzaSyAYbPIy_MkmD3kWzobkKe1gyQL92lXJMTU',
    authDomain: 'github-traffic-website-545f4.firebaseapp.com',
    projectId: 'github-traffic-website-545f4',
  }
  firebase.initializeApp(config)
}

export const signInWithRedirect = () => {
  const provider = new firebase.auth.GithubAuthProvider()
  provider.addScope('repo')
  firebase.auth().signInWithRedirect(provider)
}

export const signOut = async () => {
  return firebase.auth().signOut()
}

export const getFirebaseRedirectResult = async () => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .getRedirectResult()
      .then(result => {
        const { credential, additionalUserInfo } = result
        if (!credential) {
          resolve()
        }
        const { accessToken } = credential
        const { username } = additionalUserInfo

        fetchRepoTraffic(username, accessToken)
          .then(trafficData => {
            resolve({ graphData: trafficData, username })
          })
          .catch(error => reject(error))
      })
      .catch(error => reject(error))
  })
}
