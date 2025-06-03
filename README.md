# Clean Architecture API

This API project is being created using [Node.js](https://nodejs.org/en/), [Typescript](https://www.typescriptlang.org/), and the [Express Framework](https://expressjs.com/), following principles of the [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html), [SOLID](https://www.geeksforgeeks.org/solid-principle-in-programming-understand-with-real-life-examples/) principles, [TDD (Test-Driven Development)](https://www.browserstack.com/guide/what-is-test-driven-development), and [Design Patterns](https://refactoring.guru/design-patterns).

## Methodologies and Designs

- TDD
- Clean Architecture
- Conventional Commits

## Principles

- SOLID
- Small Commits

## Design Patterns

- Adapter
- Composite
- Dependency Injection
- Factory Method

## Libraries and Tools

- [NPM](https://www.npmjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://docs.docker.com/compose/)
- [Jest](https://jestjs.io/pt-BR/)
- [Validator](https://github.com/validatorjs/validator.js)
- [Git](https://git-scm.com/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## Docker Compose

- **docker compose up -d**: command to build the docker compose file
- **docker compose stop**: command to stop the docker image
- **docker compose rm -fsv**: command stop and remove all containers from your project

## TODO

- [x] Create CRUD operations for "user"

  - [x] CREATE
  - [x] READ
    - [x] FIND ALL USERS
    - [x] FIND USER BY ID
  - [x] UPDATE
  - [x] DELETE

- [x] Request data validation
- [x] Docker compose
- [ ] Error handling
- [ ] User sign-in with token
