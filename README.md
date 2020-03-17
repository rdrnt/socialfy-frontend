# Socialfy

Your Spotify listening, more socially. Share what you're currently listening too, your top artists, and more.

## How to build

1. You will require access to the backend server

2. You will need a firebase config in `src/config/firebase{env}.json`

3. Add a `.env.local` at the root of the project with the following content:

```
REACT_APP_GA_ANALYTICS=ANALYTICS KEY
```

## How to deploy

1. Make sure Netlify CLI is linked

2. `yarn netlify-deploy` or `yarn netlify-deploy:prod`
