/**
 * DTO for recipe response
 */
export class RecipeResponseDto {
  id: string;
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
  averageRating: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}
