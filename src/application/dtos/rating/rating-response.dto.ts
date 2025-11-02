/**
 * DTO for rating response
 */
export class RatingResponseDto {
  id: string;
  recipeId: string;
  userId: string;
  stars: number;
  createdAt: Date;
  updatedAt: Date;
}
