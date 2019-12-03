import React from 'react'
import { useParams } from 'react-router-dom';

import config from '../config';

const Auth = () => {
  const { status } = useParams();

  console.log(status);
  return (
    <div>
      <h1>You are not authenticated</h1>
      <a href={`${config.API_URL}/login`}>Authenticate here</a>
    </div>
  )
};

export default Auth;