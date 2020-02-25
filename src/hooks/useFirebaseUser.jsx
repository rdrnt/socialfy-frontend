import React from 'react';
import { Firebase } from '../helpers';

function useEffectAsync(effect, inputs = []) {
  React.useEffect(() => {
    effect();
  }, inputs);
}

const useFirebaseUser = (username, onNewUser = () => {}) => {
  const [user, setUser] = React.useState(undefined);
  const [loading, setLoading] = React.useState(true);

  const setUserFromSnapshot = userData => {
    setUser(userData);
    setLoading(false);
  };

  // If the username given param changes
  useEffectAsync(async () => {
    const userDoc = await Firebase.getUserDoc(username);
    if (userDoc && userDoc.exists) {
      let listener = userDoc.ref.onSnapshot(userSnapshot => {
        const userData = userSnapshot.data();

        // if we didn't already have a user, and the new user exists
        if (!user) {
          onNewUser(user, userData);
        }

        setUserFromSnapshot(userData);
      });

      return () => {
        console.log('useFirebaseUser goodbye');
        if (listener) {
          listener();
          listener = undefined;
        }
        setUserFromSnapshot(undefined);
      };
    } else if (!userDoc) {
      setUserFromSnapshot(undefined);
    }
  }, [username]);

  return [user, loading];
};

export default useFirebaseUser;
