import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import firebaseConfig from '../config/firebase.json';

const Firebase = {
  initialize: () => {
    firebase.initializeApp(firebaseConfig);
  },
  getUser: async username => {
    try {
      const userDocQuery = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();

      if (userDocQuery.docs[0]) {
        return userDocQuery.docs[0].data();
      }

      return undefined;
    } catch (error) {
      console.log('Error getting user', error);
      return undefined;
    }
  },
  onUserChanged: ({ id, onChange }) =>
    firebase
      .firestore()
      .collection('users')
      .doc(id)
      .onSnapshot(userSnapshot => {
        const userData = userSnapshot.data();
        onChange(userData);
      }),
};

export default Firebase;
