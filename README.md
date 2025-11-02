# NestJS Food Microservice<p align="center">

<a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>

A microservice for managing recipes, favorites, comments, and ratings using Clean Architecture and MongoDB Atlas.</p>

## Quick Start[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456

[circleci-url]: https://circleci.com/gh/nestjs/nest

````bash

# Install dependencies  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

npm install    <p align="center">

<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>

# Configure .env file<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/recipe_app<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>

PORT=3001<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>

<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>

# Start development server<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>

npm run start:dev<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>

```  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>

    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>

## Features  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>

</p>

- ✅ Recipe management with approval workflow  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)

- ✅ User favorites system  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

- ✅ Comments with authorization

- ✅ Star ratings (1-5) with auto-calculation## Description

- ✅ Clean Architecture implementation

- ✅ MongoDB Atlas integration**Food App Microservice** - A NestJS application managing Recipe, Favorite, Comment, and Rating collections following **Clean Architecture** principles.

- ✅ Microservice-ready (CORS enabled)

This microservice is part of a larger food app project that includes a Spring Boot user authentication service.

## API Endpoints

## 🏗️ Architecture

- **Recipes**: `/recipes` (CRUD + approve/reject)

- **Favorites**: `/favorites` (add, remove, check)This project follows **Clean Architecture** with the following layers:

- **Comments**: `/comments` (CRUD with user auth)

- **Ratings**: `/ratings` (CRUD with unique constraint)- **Domain Layer**: Core business entities and repository interfaces

- **Application Layer**: Use cases and business logic

## Documentation- **Infrastructure Layer**: Database implementations (MongoDB)

- **Presentation Layer**: REST API controllers

See [SETUP.md](./SETUP.md) for detailed documentation.

📖 **Read the detailed architecture guide**: [ARCHITECTURE.md](./ARCHITECTURE.md)

## Tech Stack📊 **Understand the flow**: [CLEAN_ARCHITECTURE_FLOW.md](./CLEAN_ARCHITECTURE_FLOW.md)

📋 **Complete summary**: [SUMMARY.md](./SUMMARY.md)

- NestJS 11

- MongoDB Atlas (Mongoose)## ✨ Features

- TypeScript

- Clean Architecture- ✅ Recipe CRUD with approval workflow

- ✅ Favorites system

## Port- ✅ Comments with authorization

- ✅ Rating system with automatic averages

Default: `3001` (configurable via .env)- ✅ MongoDB integration

- ✅ Clean Architecture structure
- ✅ Microservice ready

## 🚀 Quick Start

### Prerequisites

- Node.js (v16+)
- MongoDB running on `localhost:27017`
- npm or yarn

### Installation

```bash
# Install dependencies
$ npm install

# Configure environment
$ cp .env.example .env
# Edit .env if needed (default: mongodb://localhost:27017/food-app)
````

## 🏃 Run the Application

```bash
# Development mode (with auto-reload)
$ npm run start:dev

# Production build
$ npm run build
$ npm run start:prod

# Simple start
$ npm run start
```

The API will be available at `http://localhost:3001`

## 🧪 Test the API

See detailed testing guide: [TESTING_GUIDE.md](./TESTING_GUIDE.md)

### Quick Test

```bash
# Create a recipe
curl -X POST http://localhost:3001/recipes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Recipe",
    "description": "A test recipe",
    "imageUrl": "https://example.com/image.jpg",
    "ingredients": ["ingredient1", "ingredient2"],
    "steps": ["step1", "step2"],
    "category": "Test",
    "prepTime": 10,
    "cookTime": 20,
    "difficulty": "easy",
    "userId": "user123"
  }'

# Get all recipes
curl http://localhost:3001/recipes
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
