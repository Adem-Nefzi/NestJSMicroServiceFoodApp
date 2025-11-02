import { Recipe } from '../entities/recipe.entity';

/**
 * Repository Interface - Domain Layer
 * Defines the contract for Recipe data access
 * This is framework-agnostic
 */
export interface IRecipeRepository {
  create(recipe: {
    title: string;
    description: string;
    imageUrl: string;
    ingredients: string[];
    steps: string[];
    category: string;
    prepTime: number;
    cookTime: number;
    difficulty: string;
    userId: string;
    status: 'pending' | 'approved' | 'rejected';
  }): Promise<Recipe>;
  findById(id: string): Promise<Recipe | null>;
  findAll(): Promise<Recipe[]>;
  findByUserId(userId: string): Promise<Recipe[]>;
  findByStatus(status: 'pending' | 'approved' | 'rejected'): Promise<Recipe[]>;
  findByCategory(category: string): Promise<Recipe[]>;
  update(id: string, recipe: Partial<Recipe>): Promise<Recipe | null>;
  delete(id: string): Promise<boolean>;
  updateAverageRating(recipeId: string, averageRating: number): Promise<void>;
}
