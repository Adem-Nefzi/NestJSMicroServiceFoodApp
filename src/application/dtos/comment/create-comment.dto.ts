/**
 * DTO for creating a comment
 */
export class CreateCommentDto {
  recipeId: string;
  userId: string;
  text: string;
}
