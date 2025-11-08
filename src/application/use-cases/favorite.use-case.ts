import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import type { IFavoriteRepository } from '../../domain/repositories/favorite.repository.interface';
import type { IRecipeRepository } from '../../domain/repositories/recipe.repository.interface';
import { Favorite } from '../../domain/entities/favorite.entity';
import { CreateFavoriteDto } from '../dtos/favorite/create-favorite.dto';

/**
 * Use Case: Manage Favorite Operations
 */
@Injectable()
export class FavoriteUseCase {
  constructor(
    private readonly favoriteRepository: IFavoriteRepository,
    private readonly recipeRepository: IRecipeRepository,
  ) {}

  async addFavorite(dto: CreateFavoriteDto): Promise<Favorite> {
    // Business logic: Check if favorite already exists
    const existing = await this.favoriteRepository.findByUserAndRecipe(
      dto.userId,
      dto.recipeId,
    );

    if (existing) {
      throw new ConflictException('Recipe is already in favorites');
    }

    const favorite = await this.favoriteRepository.create({
      userId: dto.userId,
      recipeId: dto.recipeId,
    });

    // Atomically increment totalFavorites counter
    await this.recipeRepository.incrementFavorites(dto.recipeId);

    return favorite;
  }

  async getFavoritesByUserId(userId: string): Promise<Favorite[]> {
    return this.favoriteRepository.findByUserId(userId);
  }

  async removeFavorite(userId: string, recipeId: string): Promise<void> {
    const deleted = await this.favoriteRepository.deleteByUserAndRecipe(
      userId,
      recipeId,
    );

    if (!deleted) {
      throw new NotFoundException('Favorite not found');
    }

    // Atomically decrement totalFavorites counter
    await this.recipeRepository.decrementFavorites(recipeId);
  }

  async checkIfFavorite(userId: string, recipeId: string): Promise<boolean> {
    const favorite = await this.favoriteRepository.findByUserAndRecipe(
      userId,
      recipeId,
    );
    return !!favorite;
  }
}
