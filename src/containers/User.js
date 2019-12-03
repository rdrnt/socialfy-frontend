import React from 'react';

import { Firebase } from '../helpers';

const User = ({ match }) => {
  const [error, setError] = React.useState(undefined);
  const [user, setUser] = React.useState(undefined);

  const fetchUser = async username => {
    const user = await Firebase.getUser(username);

    if (user) {
      setUser(user);
    }
  };

  React.useEffect(() => {
    const username = match.params.userId;

    if (username) {
      fetchUser(username);
    }
  }, [match.params.userId]);

  if (error) {
    return <p>error</p>;
  }

  if (user) {
    return <p>{user.username}</p>;
  }

  return <div>Loading....</div>;
};

export default User;
