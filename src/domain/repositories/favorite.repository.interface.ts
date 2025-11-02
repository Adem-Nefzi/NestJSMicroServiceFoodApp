import { Favorite } from '../entities/favorite.entity';

/**
 * Repository Interface - Domain Layer
 * Defines the contract for Favorite data access
 */
export interface IFavoriteRepository {
  create(favorite: { userId: string; recipeId: string }): Promise<Favorite>;
  findById(id: string): Promise<Favorite | null>;
  findByUserId(userId: string): Promise<Favorite[]>;
  findByUserAndRecipe(
    userId: string,
    recipeId: string,
  ): Promise<Favorite | null>;
  delete(id: string): Promise<boolean>;
  deleteByUserAndRecipe(userId: string, recipeId: string): Promise<boolean>;
}
