/**
 * DTO for comment response
 */
export class CommentResponseDto {
  id: string;
  recipeId: string;
  userId: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}
