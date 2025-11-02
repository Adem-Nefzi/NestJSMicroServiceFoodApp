# NestJS Food Microservice - Setup Guide

## Overview

NestJS microservice for food app with Recipe, Favorite, Comment, and Rating management using Clean Architecture and MongoDB Atlas.

---

## Architecture

### Clean Architecture Layers

```
┌─────────────────────────────────────┐
│  Presentation (Controllers)         │  REST API endpoints
├─────────────────────────────────────┤
│  Application (Use Cases)            │  Business operations
├─────────────────────────────────────┤
│  Domain (Entities + Interfaces)     │  Core business logic
├─────────────────────────────────────┤
│  Infrastructure (Database)          │  MongoDB implementation
└─────────────────────────────────────┘
```

### Project Structure

```
src/
├── domain/
│   ├── entities/                    # Business entities
│   └── repositories/                # Repository interfaces
├── application/
│   ├── use-cases/                   # Business operations
│   └── dtos/                        # Data transfer objects
├── infrastructure/
│   ├── database/schemas/            # MongoDB schemas
│   └── repositories/                # Repository implementations
├── presentation/
│   └── controllers/                 # REST API controllers
├── modules/                         # NestJS modules
├── app.module.ts                    # Root module
└── main.ts                          # Application entry
```

---

## Installation

### Prerequisites

- Node.js v16+
- MongoDB Atlas account

### Steps

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables
# Create .env file with:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/recipe_app?retryWrites=true&w=majority
PORT=3001

# 3. Start the application
npm run start:dev
```

---

## Key Dependencies

```json
{
  "@nestjs/common": "^11.0.1",
  "@nestjs/core": "^11.0.1",
  "@nestjs/config": "Latest", // Environment variables
  "@nestjs/mongoose": "^11.0.3", // MongoDB integration
  "mongoose": "^8.19.2"
}
```

---

## API Endpoints

Base URL: `http://localhost:3001`

### Recipes

| Method | Endpoint               | Description      |
| ------ | ---------------------- | ---------------- |
| POST   | `/recipes`             | Create recipe    |
| GET    | `/recipes`             | Get all recipes  |
| GET    | `/recipes/:id`         | Get recipe by ID |
| PUT    | `/recipes/:id`         | Update recipe    |
| PUT    | `/recipes/:id/approve` | Approve recipe   |
| PUT    | `/recipes/:id/reject`  | Reject recipe    |
| DELETE | `/recipes/:id`         | Delete recipe    |

### Favorites

| Method | Endpoint                                   | Description          |
| ------ | ------------------------------------------ | -------------------- |
| POST   | `/favorites`                               | Add favorite         |
| GET    | `/favorites?userId=xxx`                    | Get user's favorites |
| GET    | `/favorites/check?userId=xxx&recipeId=yyy` | Check if favorited   |
| DELETE | `/favorites?userId=xxx&recipeId=yyy`       | Remove favorite      |

### Comments

| Method | Endpoint                   | Description    |
| ------ | -------------------------- | -------------- |
| POST   | `/comments`                | Create comment |
| GET    | `/comments?recipeId=xxx`   | Get comments   |
| PUT    | `/comments/:id?userId=xxx` | Update comment |
| DELETE | `/comments/:id?userId=xxx` | Delete comment |

### Ratings

| Method | Endpoint                                       | Description     |
| ------ | ---------------------------------------------- | --------------- |
| POST   | `/ratings`                                     | Add rating      |
| GET    | `/ratings?recipeId=xxx`                        | Get ratings     |
| GET    | `/ratings/user-rating?userId=xxx&recipeId=yyy` | Get user rating |
| PUT    | `/ratings/:id?userId=xxx`                      | Update rating   |
| DELETE | `/ratings/:id?userId=xxx`                      | Delete rating   |

---

## Database Collections

MongoDB creates 4 collections in `recipe_app` database:

1. **recipeschemas** - Recipes with approval workflow
2. **favoriteschemas** - User favorites (unique: userId + recipeId)
3. **commentschemas** - Recipe comments with authorization
4. **ratingschemas** - Star ratings (1-5, unique: userId + recipeId)

---

## Configuration Fixed

### Problem

- `.env` file was not being loaded (missing `@nestjs/config` package)
- App connected to local MongoDB instead of Atlas
- Collections created in wrong database

### Solution

1. Installed `@nestjs/config` package
2. Added `ConfigModule.forRoot()` to load environment variables
3. Used `ConfigService` to read `MONGODB_URI` from `.env`

**Before:**

```typescript
MongooseModule.forRoot(
  process.env.MONGODB_URI || 'mongodb://localhost/food-app',
);
// process.env.MONGODB_URI was undefined ❌
```

**After:**

```typescript
(ConfigModule.forRoot({ isGlobal: true }),
  MongooseModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      uri: config.get<string>('MONGODB_URI'),
    }),
  }));
// Now reads .env correctly ✅
```

---

## Microservices Integration

### Current Setup

```
┌──────────────┐         ┌──────────────┐
│ Spring Boot  │         │   NestJS     │
│ User Service │         │ Food Service │
│   Port 8080  │         │   Port 3001  │
└──────┬───────┘         └──────┬───────┘
       │                        │
       └────────┬───────────────┘
                │
        ┌───────▼────────┐
        │  MongoDB Atlas │
        │   recipe_app   │
        └────────────────┘
```

### Next Steps

1. Implement JWT authentication validation
2. Add HTTP client for Spring Boot communication
3. Set up API Gateway
4. Add user verification before creating recipes/comments

---

## Running Commands

```bash
# Development
npm run start:dev

# Production Build
npm run build
npm run start:prod

# Linting
npm run lint
```

---

## Testing

```bash
# Create recipe
curl -X POST http://localhost:3001/recipes \
  -H "Content-Type: application/json" \
  -d '{"title":"Pizza","description":"Italian pizza","ingredients":["Dough","Cheese"],"steps":["Bake"],"category":"Italian","prepTime":10,"cookTime":15,"difficulty":"easy","userId":"user123"}'

# Get all recipes
curl http://localhost:3001/recipes
```

---

## Notes

- CORS enabled for microservice communication
- Port 3001 (configurable via .env)
- Shared `recipe_app` database with Spring Boot user service
- Clean Architecture ensures testability and maintainability
