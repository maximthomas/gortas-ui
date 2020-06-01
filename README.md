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
* `REACT_APP_GORTAS_URL` - Gortas service URL
* `REACT_APP_GORTAS_SIGN_UP_PATH` - Gortas service sign up path. 
Sign up URL will be like REACT_APP_GORTAS_URL + REACT_APP_GORTAS_SIGN_UP_PATH.
* `REACT_APP_GORTAS_SIGN_IN_PATH` - Gortas service sign in path. 
Sign in URL will be like REACT_APP_GORTAS_URL + REACT_APP_GORTAS_SIGN_IN_PATH.