import { IsString, IsNotEmpty } from 'class-validator';

/**
 * DTO for creating a favorite
 */
export class CreateFavoriteDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  recipeId: string;
}
