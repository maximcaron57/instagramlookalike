# Ugram backend

Some of the following steps recommend using Docker. To use Docker Compose, refer to the main [README.md](../README.md).

**Since our backend does not hold much logic, everything is tested with end-to-end tests. Our Postman collections and env vars are available in [`resources`](resources).**

Upon running the backend, you can access Swagger UI on [http://localhost:4000/docs](http://localhost:4000/docs).

## Installation

Run the following commands in this directory.

With Docker : 
```shell
docker build -t backend .
docker build --no-cache -t backend . # If you have issues with packages not updating or installing
```

Without Docker : 
```
yarn install
```

## Usage

### Execute app

Run the following commands in this directory.

With Docker :
```shell
docker run backend
```

Without Docker :
```
yarn build:all
yarn start
```

Without Docker (with auto-reload) :
```
yarn build:all
yarn start:watch
```

The app will be running on [localhost:4000](http://localhost:4000).

Some Postman requests and environment variables are available in [resources](resources).
- To run Postman requests, a valid cookie value needs to be attributed to the `cookie` environment variable in Postman.
- This value can be found in the `Cookie` header of authenticated requests made from the browser.

## Contributing

The following commands do not concern Docker.

### Run tests

```
yarn test
```

TODO : Change this if no test are put here (let's use integration tests with docker-compose!)

### Verify code style

```
yarn lint
```

### Fix code style

```
yarn lint --fix
```

## Database migrations

Migrations are located in `src/migrations`. The database needs to be up and running. If using docker-compose, make sure the database service is running and you use the following commands in the backend service.

To list possible migrations : 
```
yarn migrate list
```

To apply all migrations : 
```
yarn migrate up
```

To apply a single migration :
```
yarn migrate up <migrationName>
yarn migrate up add_fake_field #example
```

To rollback a single migration :
```
yarn migrate down <migrationName>
yarn migrate down add_fake_field #example
```

To create a new migration :
```
yarn migrate create <migrationName>
yarn migrate create add_fake_field #example
```

## Generate fake data

Prepare same setup as running migrations (database up and running, use docker-compose for following commands).

```
yarn migrate:feed up
```

You can choose yourself the feeding migration by giving it the name (like when running normal migrations). The difference here is that those migrations can be run infinitely and are placed in `src/migrations_feed`.

You can always delete fake data with :

```
yarn migrate:feed down <migrationName>
```
