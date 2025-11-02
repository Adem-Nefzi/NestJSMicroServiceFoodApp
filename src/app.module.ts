import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
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
  providers: [AppService],
})
export class AppModule {}
