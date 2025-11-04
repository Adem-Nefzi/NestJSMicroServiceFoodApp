import { IsString, IsNotEmpty } from 'class-validator';

/**
 * DTO for updating a comment
 */
export class UpdateCommentDto {
  @IsString()
  @IsNotEmpty()
  text: string;
}
