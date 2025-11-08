import {
  IsString,
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  IsEnum,
  IsNumber,
  Min,
} from 'class-validator';

/**
 * DTO for creating a new recipe
 * Used in the interface adapter layer
 */
export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'At least one ingredient is required' })
  @IsString({ each: true })
  ingredients: string[];

  @IsArray()
  @ArrayMinSize(1, { message: 'At least one step is required' })
  @IsString({ each: true })
  steps: string[];

  @IsEnum(['main-course', 'dessert', 'appetizer', 'soup', 'salad'], {
    message:
      'Category must be one of: main-course, dessert, appetizer, soup, salad',
  })
  category: 'main-course' | 'dessert' | 'appetizer' | 'soup' | 'salad';

  @IsNumber()
  @Min(1, { message: 'Prep time must be at least 1 minute' })
  prepTime: number;

  @IsNumber()
  @Min(1, { message: 'Cook time must be at least 1 minute' })
  cookTime: number;

  @IsEnum(['easy', 'medium', 'hard'], {
    message: 'Difficulty must be one of: easy, medium, hard',
  })
  difficulty: 'easy' | 'medium' | 'hard';

  @IsString()
  @IsNotEmpty()
  userId: string;
}
