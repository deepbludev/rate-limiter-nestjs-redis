## Description

Example of a simple web application with a API rate limiter based on the [sliding window](https://en.wikipedia.org/wiki/Sliding_window_protocol) strategy, using a Redis cache instead of the Nest.js default throttle guard.

It uses a middleware to intercept the request and check if the user has exceeded the limit of requests, if so, it returns a 429 status code.

The rate limit is based on the user IP address for public routes and a API token for private routes.

## Installation

```bash
# install dependencies
$ npm install

# initialize redis cache server
$ docker-compose up -d
```


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# e2e tests
$ npm run test:e2e

# unit tests
$ npm run test
```
