# Gortas-UI

**Gotras-UI** is React.js based sample client application for authenticate via [Gortas](https://github.com/maximthomas/gortas)

## Build and Run

For local development

```bash
yarn run
```

With docker-compose

```bash
docker-compose up --build
```

## Environment Variables
* `REACT_APP_SIGN_UP_URL` - Gortas service Sign Up URL 
* `REACT_APP_SIGN_IN_URL` - Gortas service Sign In URL
* `REACT_APP_IDM_URL` - Gortas service identity management service - receives authenticated user data 
