<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">Food Recipe Microservice</h1>

<p align="center">
  A production-ready NestJS microservice for managing recipes, favorites, comments, and ratings.
  <br />
  Built with Clean Architecture principles and MongoDB Atlas.
</p>

## ✨ Features

### Core Functionality

- 🍳 **Recipe Management** - Create, read, update, and delete recipes with approval workflow
- ⭐ **Favorites System** - Users can save and manage their favorite recipes
- 💬 **Comments** - Users can comment on recipes with proper authorization
- ⭐ **Rating System** - 5-star rating system with automatic average calculation
- 🖼️ **Image Upload** - Secure image uploads with ImageKit integration

### Technical Features

- 🏗️ **Clean Architecture** - Separation of concerns with Domain, Application, Infrastructure, and Presentation layers
- 🛡️ **Production Security** - Helmet.js, rate limiting, CORS, and input validation
- 📦 **MongoDB Atlas** - Cloud database integration with Mongoose ODM
- 🐳 **Docker Support** - Ready for containerized deployment
- 🔄 **Microservice Ready** - CORS enabled for inter-service communication
- 📝 **TypeScript** - Full type safety and modern JavaScript features

## 🏗️ Architecture

This project follows **Clean Architecture** principles:

```
src/
├── domain/              # Business entities and repository interfaces
├── application/         # Use cases and business logic
├── infrastructure/      # Database, external services (MongoDB, ImageKit)
└── presentation/        # REST API controllers
```

**Benefits:**

- ✅ Independent of frameworks and UI
- ✅ Testable business logic
- ✅ Easy to swap databases or external services
- ✅ Clear separation of concerns

## 🚀 Tech Stack

- **Framework:** NestJS 11
- **Language:** TypeScript
- **Database:** MongoDB Atlas with Mongoose
- **Cloud Storage:** ImageKit.io
- **Security:** Helmet, Throttler, CORS
- **Deployment:** Docker, Docker Compose

## � Prerequisites

- Node.js (v18 or v20 recommended)
- npm or yarn
- MongoDB Atlas account (or local MongoDB instance)
- ImageKit.io account (for image uploads)

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/Adem-Nefzi/NestJSMicroServiceFoodApp.git
cd nest-food-app

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your credentials (MongoDB URI, ImageKit keys, etc.)
```

## ⚙️ Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Application
NODE_ENV=development
PORT=3001

# Database
MONGODB_URI=your_mongodb_atlas_connection_string

# Image Storage
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

# Security
CORS_ORIGINS=http://localhost:3000,http://localhost:4200
RATE_LIMIT_TTL=60000
RATE_LIMIT_MAX=100
```

## 🏃 Running the Application

```bash
# Development mode (with hot reload)
npm run start:dev

# Production mode
npm run build
npm run start:prod

# Watch mode
npm run start
```

The API will be available at `http://localhost:3001`

## 🐳 Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build Docker image manually
docker build -t nest-food-app .
docker run -p 3001:3001 --env-file .env nest-food-app
```

## 📡 API Endpoints

### Recipes

- `GET /recipes` - Get all recipes
- `GET /recipes/:id` - Get recipe by ID
- `POST /recipes` - Create new recipe
- `PUT /recipes/:id` - Update recipe
- `DELETE /recipes/:id` - Delete recipe
- `PATCH /recipes/:id/approve` - Approve recipe
- `PATCH /recipes/:id/reject` - Reject recipe

### Favorites

- `GET /favorites/user/:userId` - Get user's favorites
- `POST /favorites` - Add recipe to favorites
- `DELETE /favorites/:id` - Remove from favorites

### Comments

- `GET /comments/recipe/:recipeId` - Get recipe comments
- `POST /comments` - Add comment
- `PUT /comments/:id` - Update comment
- `DELETE /comments/:id` - Delete comment

### Ratings

- `GET /ratings/recipe/:recipeId` - Get recipe ratings
- `POST /ratings` - Add/Update rating
- `DELETE /ratings/:id` - Delete rating

### Uploads

- `POST /upload/recipe-image` - Upload recipe image

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Generate test coverage
npm run test:cov

# Run linting
npm run lint
```

## 🔒 Security Features

- **Helmet.js** - Secure HTTP headers
- **Rate Limiting** - 100 requests per minute per IP
- **CORS** - Configurable allowed origins
- **Input Validation** - DTOs with class-validator
- **File Upload Security** - Size and type restrictions
- **Compression** - Reduced bandwidth usage

## 🛠️ Built With

- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling
- [ImageKit](https://imagekit.io/) - Cloud image storage and CDN
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript

## 📝 Project Structure

```
src/
├── domain/                    # Business entities & interfaces
│   ├── entities/             # Core business objects
│   └── repositories/         # Repository interfaces
├── application/              # Business logic & use cases
│   └── use-cases/           # Application services
├── infrastructure/           # External services & implementations
│   ├── database/            # MongoDB schemas & models
│   ├── repositories/        # Repository implementations
│   └── services/            # External services (ImageKit)
├── presentation/            # API layer
│   └── controllers/         # REST endpoints
├── modules/                 # NestJS modules
└── common/                  # Shared utilities & types
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Adem Nefzi**

- GitHub: [@Adem-Nefzi](https://github.com/Adem-Nefzi)

## 🙏 Acknowledgments

- Built with [NestJS](https://nestjs.com/)
- Inspired by Clean Architecture principles
- Part of a microservices-based food application project
