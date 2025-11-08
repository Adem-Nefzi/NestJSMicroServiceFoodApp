import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FavoriteSchema,
  FavoriteMongoSchema,
} from '../infrastructure/database/schemas/favorite.schema';
import {
  RecipeSchema,
  RecipeMongoSchema,
} from '../infrastructure/database/schemas/recipe.schema';
import { FavoriteRepository } from '../infrastructure/repositories/favorite.repository';
import { RecipeRepository } from '../infrastructure/repositories/recipe.repository';
import { FavoriteUseCase } from '../application/use-cases/favorite.use-case';
import { FavoriteController } from '../presentation/controllers/favorite.controller';
import { IFavoriteRepository } from '../domain/repositories/favorite.repository.interface';
import { IRecipeRepository } from '../domain/repositories/recipe.repository.interface';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FavoriteSchema.name, schema: FavoriteMongoSchema },
      { name: RecipeSchema.name, schema: RecipeMongoSchema },
    ]),
  ],
  controllers: [FavoriteController],
  providers: [
    FavoriteUseCase,
    {
      provide: 'IFavoriteRepository',
      useClass: FavoriteRepository,
    },
    {
      provide: 'IRecipeRepository',
      useClass: RecipeRepository,
    },
    {
      provide: FavoriteUseCase,
      useFactory: (
        favoriteRepository: IFavoriteRepository,
        recipeRepository: IRecipeRepository,
      ) => {
        return new FavoriteUseCase(favoriteRepository, recipeRepository);
      },
      inject: ['IFavoriteRepository', 'IRecipeRepository'],
    },
  ],
  exports: [FavoriteUseCase, 'IFavoriteRepository'],
})
export class FavoriteModule {}
