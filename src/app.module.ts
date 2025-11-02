import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './modules/recipe.module';
import { FavoriteModule } from './modules/favorite.module';
import { CommentModule } from './modules/comment.module';
import { RatingModule } from './modules/rating.module';
import { UploadModule } from './modules/upload.module';

/**
 * Root Application Module
 * Configures MongoDB Atlas connection and imports all feature modules
 */
@Module({
  imports: [
    // Load environment variables from .env file
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      cache: true, // Cache environment variables for better performance
    }),

    // Rate limiting to prevent abuse
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          ttl: configService.get<number>('RATE_LIMIT_TTL') || 60000, // Time window in ms
          limit: configService.get<number>('RATE_LIMIT_MAX') || 100, // Max requests per window
        },
      ],
    }),

    // MongoDB Atlas Configuration
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri:
          configService.get<string>('MONGODB_URI') ||
          'mongodb://localhost:27017/food-app',
      }),
    }),

    // Feature Modules
    RecipeModule,
    FavoriteModule,
    CommentModule,
    RatingModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Apply rate limiting globally to all routes
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
