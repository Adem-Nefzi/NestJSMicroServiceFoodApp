import { Rating } from '../entities/rating.entity';

/**
 * Repository Interface - Domain Layer
 * Defines the contract for Rating data access
 */
export interface IRatingRepository {
  create(rating: {
    recipeId: string;
    userId: string;
    stars: number;
  }): Promise<Rating>;
  findById(id: string): Promise<Rating | null>;
  findByRecipeId(recipeId: string): Promise<Rating[]>;
  findByUserId(userId: string): Promise<Rating[]>;
  findByUserAndRecipe(userId: string, recipeId: string): Promise<Rating | null>;
  update(id: string, stars: number): Promise<Rating | null>;
  delete(id: string): Promise<boolean>;
  calculateAverageRating(recipeId: string): Promise<number>;
}
