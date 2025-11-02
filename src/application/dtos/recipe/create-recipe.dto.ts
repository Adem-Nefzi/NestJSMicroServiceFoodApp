/**
 * DTO for creating a new recipe
 * Used in the interface adapter layer
 */
export class CreateRecipeDto {
  title: string;
  description: string;
  imageUrl: string;
  ingredients: string[];
  steps: string[];
  category: 'main-course' | 'dessert' | 'appetizer' | 'soup' | 'salad';
  prepTime: number;
  cookTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  userId: string;
}
