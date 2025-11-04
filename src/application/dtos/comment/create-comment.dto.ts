import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

/**
 * DTO for creating a comment or reply
 */
export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  recipeId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsOptional()
  @IsString()
  parentCommentId?: string | null; // null or undefined = top-level comment, otherwise it's a reply
}
