import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import type { IFavoriteRepository } from '../../domain/repositories/favorite.repository.interface';
import { Favorite } from '../../domain/entities/favorite.entity';
import { CreateFavoriteDto } from '../dtos/favorite/create-favorite.dto';

/**
 * Use Case: Manage Favorite Operations
 */
@Injectable()
export class FavoriteUseCase {
  constructor(private readonly favoriteRepository: IFavoriteRepository) {}

  async addFavorite(dto: CreateFavoriteDto): Promise<Favorite> {
    // Business logic: Check if favorite already exists
    const existing = await this.favoriteRepository.findByUserAndRecipe(
      dto.userId,
      dto.recipeId,
    );

    if (existing) {
      throw new ConflictException('Recipe is already in favorites');
    }

    return this.favoriteRepository.create({
      userId: dto.userId,
      recipeId: dto.recipeId,
    });
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
  }

  async checkIfFavorite(userId: string, recipeId: string): Promise<boolean> {
    const favorite = await this.favoriteRepository.findByUserAndRecipe(
      userId,
      recipeId,
    );
    return !!favorite;
  }
}
