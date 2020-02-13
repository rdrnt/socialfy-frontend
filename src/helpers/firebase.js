import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import firebaseProdConfig from '../config/firebaseProd.json';
import firebaseDevConfig from '../config/firebaseDev.json';

import Environment from './env';

const Firebase = {
  initialize: () => {
    const configToUse = Environment.isDevelopment
      ? firebaseDevConfig
      : firebaseProdConfig;
    firebase.initializeApp(configToUse);
  },
  getInstance: () => firebase,
  getUserDoc: async username => {
    try {
      const userDocQuery = await firebase
        .firestore()
        .collection('users')
        .where('profile.username', '==', username)
        .get();

      if (userDocQuery.docs[0]) {
        return userDocQuery.docs[0];
      }

      return undefined;
    } catch (error) {
      console.log('Error getting user', error);
      return undefined;
    }
  },
  getUsersFromResult: async (searchValue = '') => {
    // https://stackoverflow.com/a/56815787/5314646
    const matchingUserDocs = await firebase
      .firestore()
      .collection('users')
      .where('profile.username', '>=', searchValue)
      .where('profile.username', '<=', searchValue + '\uf8ff')
      .get();

    const matchingUsers = matchingUserDocs.docs.map(userDoc => {
      const userData = userDoc.data();

      return userData.profile;
    });

    return matchingUsers;
  },
};

export default Firebase;
