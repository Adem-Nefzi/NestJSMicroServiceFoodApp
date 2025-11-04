/**
 * DTO for comment response with nested replies
 */
export class CommentResponseDto {
  id: string;
  recipeId: string;
  userId: string;
  text: string;
  parentCommentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  replies?: CommentResponseDto[]; // Nested replies
}
