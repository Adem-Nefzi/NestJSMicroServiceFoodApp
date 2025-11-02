import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RatingSchema,
  RatingMongoSchema,
} from '../infrastructure/database/schemas/rating.schema';
import { RatingRepository } from '../infrastructure/repositories/rating.repository';
import { RatingUseCase } from '../application/use-cases/rating.use-case';
import { RatingController } from '../presentation/controllers/rating.controller';
import { IRatingRepository } from '../domain/repositories/rating.repository.interface';
import { IRecipeRepository } from '../domain/repositories/recipe.repository.interface';
import { RecipeModule } from './recipe.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RatingSchema.name, schema: RatingMongoSchema },
    ]),
    RecipeModule, // Import RecipeModule for recipe repository dependency
  ],
  controllers: [RatingController],
  providers: [
    RatingUseCase,
    {
      provide: 'IRatingRepository',
      useClass: RatingRepository,
    },
    {
      provide: RatingUseCase,
      useFactory: (
        ratingRepository: IRatingRepository,
        recipeRepository: IRecipeRepository,
      ) => {
        return new RatingUseCase(ratingRepository, recipeRepository);
      },
      inject: ['IRatingRepository', 'IRecipeRepository'],
    },
  ],
  exports: [RatingUseCase, 'IRatingRepository'],
})
export class RatingModule {}
