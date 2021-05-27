# Ugram

[![Frontend CI](https://github.com/GLO3112-classrooms/ugram-h2021-team-03/actions/workflows/frontend-ci.yml/badge.svg)](https://github.com/GLO3112-classrooms/ugram-h2021-team-03/actions/workflows/frontend-ci.yml)
[![Frontend CD (staging)](https://github.com/GLO3112-classrooms/ugram-h2021-team-03/actions/workflows/frontend-cd-staging.yml/badge.svg)](https://github.com/GLO3112-classrooms/ugram-h2021-team-03/actions/workflows/frontend-cd-staging.yml)
[![Frontend CD (production)](https://github.com/GLO3112-classrooms/ugram-h2021-team-03/actions/workflows/frontend-cd-production.yml/badge.svg)](https://github.com/GLO3112-classrooms/ugram-h2021-team-03/actions/workflows/frontend-cd-production.yml)

[![Backend CI](https://github.com/GLO3112-classrooms/ugram-h2021-team-03/actions/workflows/backend-ci.yml/badge.svg)](https://github.com/GLO3112-classrooms/ugram-h2021-team-03/actions/workflows/backend-ci.yml)
[![Backend CD (staging)](https://github.com/GLO3112-classrooms/ugram-h2021-team-03/actions/workflows/backend-cd-staging.yml/badge.svg)](https://github.com/GLO3112-classrooms/ugram-h2021-team-03/actions/workflows/backend-cd-staging.yml)
[![Backend CD (production)](https://github.com/GLO3112-classrooms/ugram-h2021-team-03/actions/workflows/backend-cd-production.yml/badge.svg)](https://github.com/GLO3112-classrooms/ugram-h2021-team-03/actions/workflows/backend-cd-production.yml)

[![codecov](https://codecov.io/gh/GLO3112-classrooms/ugram-h2021-team-03/branch/develop/graph/badge.svg?token=KH3C595NOS)](https://codecov.io/gh/GLO3112-classrooms/ugram-h2021-team-03)
[![Dependabot](https://badgen.net/badge/Dependabot/enabled/green?icon=dependabot)](https://dependabot.com/)

Instagram clone, project for course GLO-3112 of team 3 at Laval University (Winter 2021)

Here are the links to our environments : 

Production
- [Frontend](http://ugram.ca)
- [Backend](http://api.ugram.ca)
- [API documentation](http://api.ugram.ca/docs)

Staging
- [Frontend](http://staging.ugram.ca)
- [Backend](http://api.staging.ugram.ca)
- [API documentation](http://api.staging.ugram.ca/docs)

To use the frontend, backend or database individually, please refer to their respective README.md files : 
- [Frontend](frontend)
- [Backend](backend)
- [Database](database)

Note that our backend code coverage seems low, but we use end-to-end tests that cover the CRUD logic, which will be implemented as an automated workflow when we'll have some free time. The required postman requests collection, end-to-end tests collection and environment variables are located in [backend/resources](backend/resources).

## Important information

### Monitoring strategies

We use CloudWatch, Sentry and Google Analytics to monitor our app, both on staging and production environments. Here is how we set it up : 

#### CloudWatch

We use [Winston](https://github.com/winstonjs/winston) to monitor all the happens in our backend. The setup is fairly simple, basically, we monitor : 

- All API calls
- All errors occuring during runtime

This is made easy with the [express-winston](https://www.npmjs.com/package/express-winston) package. We can then use the [winston-cloudwatch](https://www.npmjs.com/package/winston-cloudwatch) package to send all our logs to [CloudWatch](https://aws.amazon.com/cloudwatch), on both staging and production app.

#### Sentry

[Sentry](https://sentry.io) is configured on our frontend using [sentry/react](https://docs.sentry.io/platforms/javascript/guides/react/). The setup is fairly simple, we trace usage of the app within the browser for our users. We could say we use Sentry as a UX tool.

#### Google Analytics

[Google Analytics](https://analytics.google.com/analytics/web) is configured on our frontend using [react-ga](https://github.com/react-ga/react-ga). We only implemented a basic setup : each visited page is sent to GA with some user data.

### Additionnal functionnalities

Here are the functionnalities we chose and how we implemented them : 

#### Getting top hashtags

"(5) L'usager doit pouvoir consulter les mots-clés les plus populaires"

Top hashtags are displayed in the search view, which is accessible by pressing the search icon in the navigation bar. On this page, three tabs are available, filtered by the given search value (in search bar). The tabs are : 

- Users (filtered by username)
- Hashtags (filtered by hashtag)
- Posts (filtered by description)

Hashtags are filtered by usage count, the number of posts that uses this hashtag. Going to this page without any search query shows the top hashtags.

#### Applying filters on newly created posts

"(5) L'usager doit pouvoir appliquer des filtres sur ses photos lors du téléversement"

When creating a post, using the plus icon in the navigation bar, once a file is selected, you can apply a filter in the editor tool. This filter will be applied on your image before submitting to the API.

#### Drawing on newly created posts

"(5) L'usager doit pouvoir dessiner sur la photo lors du téléversement"

Same as applying filters, you can freely draw on uploaded images in the editor tool before submitting to the API

## Technical debt

We aren't perfect and we know it. Here's the list of improvements upon release 2 : 

- [Frontend's forms are missing a lot of tests](https://github.com/GLO3112-classrooms/ugram-h2021-team-03/issues/242).
- [Frontend's components structure should be simpler](https://github.com/GLO3112-classrooms/ugram-h2021-team-03/issues/570).
- [While it makes sense that our backend isn't unit tested and only end-to-end tested, we should have this CI-checked](https://github.com/GLO3112-classrooms/ugram-h2021-team-03/issues/138).
- Some other things, all reference in our [issues](https://github.com/GLO3112-classrooms/ugram-h2021-team-03/issues).

## Chosen technologies

### Frontend

- Application framework : [React](https://reactjs.org/)
- Language : [Typescript](https://www.typescriptlang.org/)
- Styles and components : [Material UI](https://material-ui.com/)
- Minifier : [webpack](https://webpack.js.org/)
- User events tracking framework and archive : [Sentry](https://sentry.io)
- Web analytics framework and archive : [Google Analytics](https://analytics.google.com/analytics/web)

### Backend

- Application framework : [Express](https://expressjs.com/)
- Language : [Typescript](https://www.typescriptlang.org/)
- Object modeler : [Mongoose](https://mongoosejs.com/)
- REST API framework : [TSOA](https://github.com/lukeautry/tsoa)
- Migration framework : [migrate-mongoose](https://www.npmjs.com/package/migrate-mongoose)
- Logging framework : [Winston](https://github.com/winstonjs/winston)
- Logging archive : [CloudWatch](https://aws.amazon.com/cloudwatch)

### Typescript

- Package manager : [Yarn](https://yarnpkg.com/)
- Test framework : [Jest](https://jestjs.io/)
- Data faker factory for testing : [node-factory](https://olavoasantos.github.io/node-factory/)
- Linter : [eslint](https://eslint.org/)
- Linting enforcement : [lint-staged](https://github.com/okonet/lint-staged)
- Code format : [Prettier](https://prettier.io/)
- Automatic application restart : [nodemon](https://nodemon.io/)
- Pre-commit hooks : [Husky](https://github.com/typicode/husky)

### Database

- NoSQL database : [MongoDB](https://www.mongodb.com/)

### Others

- Workflows : [Github Actions](https://github.com/features/actions)
- Containers : [Docker](https://www.docker.com/)
- Container manager : [Docker compose](https://docs.docker.com/compose/)
- Code coverage reports : [codecov](https://codecov.io/)
- API documentation : [Swagger UI](https://swagger.io/tools/swagger-ui/)

## Installation

With Docker Compose : 
```shell
docker-compose build
docker-compose build --no-cache # If you have issues with packages not updating or installing
```

Backend needs to be manually rebuilt, even after building with Docker Compose (this is a known issue : [#142](https://github.com/GLO3112-classrooms/ugram-h2021-team-03/issues/142))

```shell
docker-compose run backend yarn build:all
```

Without Docker Compose : refer to each app's README.md file.

## Usage

### Execute app

With Docker Compose :
```shell
docker-compose up
```

Without Docker Compose : refer to each app's README.md file.

Each app will run on : 

- Frontend : [localhost:3000](http://localhost:3000)
- Backend : [localhost:4000](http://localhost:4000)
- Database : [localhost:27017](http://localhost:27017)

## Contributing

Before contributing to the project, please read our [contribution guide](CONTRIBUTING.md). Also, please refer to each app's README.md file.

## License

`MIT` : [License](LICENSE)
