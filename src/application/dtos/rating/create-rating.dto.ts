import { IsString, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

/**
 * DTO for creating/updating a rating
 */
export class CreateRatingDto {
  @IsString()
  @IsNotEmpty()
  recipeId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @Min(1, { message: 'Rating must be at least 1 star' })
  @Max(5, { message: 'Rating must be at most 5 stars' })
  stars: number; // 1-5
}
