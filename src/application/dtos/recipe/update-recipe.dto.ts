/**
 * DTO for updating a recipe
 */
export class UpdateRecipeDto {
  title?: string;
  description?: string;
  imageUrl?: string;
  ingredients?: string[];
  steps?: string[];
  category?: 'main-course' | 'dessert' | 'appetizer' | 'soup' | 'salad';
  prepTime?: number;
  cookTime?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
}
