import React from 'react';
import { Firebase } from '../helpers';

function useEffectAsync(effect, inputs = []) {
  React.useEffect(() => {
    effect();
  }, inputs);
}

const useFirebaseUser = (username, onNewUser = () => {}) => {
  const [user, setUser] = React.useState(undefined);

  // If the username given param changes
  useEffectAsync(async () => {
    const userDoc = await Firebase.getUserDoc(username);
    if (userDoc.exists) {
      let listener = userDoc.ref.onSnapshot(userSnapshot => {
        const userData = userSnapshot.data();
        setUser(userData);

        // if we didn't already have a user, and the new user exists
        if (!user && userSnapshot.exists) {
          onNewUser(user, userData);
        }
      });

      return () => {
        console.log('useFirebaseUser goodbye');
        if (listener) {
          listener();
          listener = undefined;
        }
        setUser(undefined);
      };
    }
  }, [username]);

  return user;
};

export default useFirebaseUser;
