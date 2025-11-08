import {
  IsString,
  IsArray,
  ArrayMinSize,
  IsEnum,
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';

/**
 * DTO for updating a recipe
 */
export class UpdateRecipeDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  ingredients?: string[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  steps?: string[];

  @IsOptional()
  @IsEnum(['main-course', 'dessert', 'appetizer', 'soup', 'salad'])
  category?: 'main-course' | 'dessert' | 'appetizer' | 'soup' | 'salad';

  @IsOptional()
  @IsNumber()
  @Min(1)
  prepTime?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  cookTime?: number;

  @IsOptional()
  @IsEnum(['easy', 'medium', 'hard'])
  difficulty?: 'easy' | 'medium' | 'hard';
}
