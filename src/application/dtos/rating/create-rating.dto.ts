/**
 * DTO for creating/updating a rating
 */
export class CreateRatingDto {
  recipeId: string;
  userId: string;
  stars: number; // 1-5
}
