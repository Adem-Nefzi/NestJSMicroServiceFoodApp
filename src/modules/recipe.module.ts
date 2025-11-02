import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RecipeSchema,
  RecipeMongoSchema,
} from '../infrastructure/database/schemas/recipe.schema';
import { RecipeRepository } from '../infrastructure/repositories/recipe.repository';
import { RecipeUseCase } from '../application/use-cases/recipe.use-case';
import { RecipeController } from '../presentation/controllers/recipe.controller';
import { IRecipeRepository } from '../domain/repositories/recipe.repository.interface';

/**
 * Recipe Module - Wires all dependencies together
 * Following Clean Architecture and Dependency Injection
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RecipeSchema.name, schema: RecipeMongoSchema },
    ]),
  ],
  controllers: [RecipeController],
  providers: [
    RecipeUseCase,
    {
      provide: 'IRecipeRepository',
      useClass: RecipeRepository,
    },
    {
      provide: RecipeUseCase,
      useFactory: (repository: IRecipeRepository) => {
        return new RecipeUseCase(repository);
      },
      inject: ['IRecipeRepository'],
    },
  ],
  exports: [RecipeUseCase, 'IRecipeRepository'],
})
export class RecipeModule {}
