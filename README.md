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
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# Services Environment variables

DB_NAME -> database name used for authentication(only in graphql api)
MOVIES_ENDPOINT -> Movies DB url configuration. Ex: http://content.viaplay.se/pc-se/film 

Note: we can leave them on .env file.

# Login

As starting point we aer using the following credentials:

Admin/admins123

When starting the app, Database will be loader with ADMIN user.

So, the URL for login is:

curl -X POST http://localhost:3000/auth/login -d '{"name": "Admin", "password": "admin123"}' -H "Content-Type: application/json"

The rest of the app endpoints should be protected, so, we should attach the token to request header after login.

Ex:

curl -X GET http://localhost:3000/v1/users -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTQ3Nzc2MjUsImV4cCI6MTYxNDc3NzY4NX0.Izgf74P5doGQA5iiHbSTKKKUlcCsTRB4kDFETWINpqg" -d '{"name": "Admin"}'

Note: Of course we will make public endpoints as we need.

# Graph QL

1) Run application: npm run start:dev or npm run start

2) Access url: http://localhost:3000/graphql

3) Singin

query {
  signin(name: "Admin", password: "admin123") {
    token
  }
}

4) Get the token returned and set as "Bearer "authorization" header parameter

5) Query by name:

query {
  user (name: "Admin"){
    name
    password
    createdAt
  }
}

# Testing the application 

1) Through REST api

GET
http://localhost:3000/v1/movie/trailer/<movie title>

Return
{
  url: "http://trailer/of/the/movie"
}

or empty {}

2) Through GraphQL api

http://localhost:3000/graphql

Query:

query {
  trailer (title: <movi title>){
    url
  }
}

Result:

{
  "data": {
    "trailer": {
      "url": "http://trailer/of/the/movie"
    }
  }
}

# DOCKER RUN 

docker run -p 3000:3000 movies-api \
-e DB_NAME="moviesdb" \
-e MOVIES_ENDPOINT="http://content.viaplay.se/pc-se/film"