/**
 * Rating Entity - Domain Layer
 * Represents a user's rating for a recipe
 */
export class Rating {
  constructor(
    public readonly id: string,
    public readonly recipeId: string,
    public readonly userId: string,
    public stars: number, // 1-5
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {
    this.validateStars(stars);
  }

  /**
   * Business logic: Validate star rating
   */
  private validateStars(stars: number): void {
    if (stars < 1 || stars > 5) {
      throw new Error('Rating must be between 1 and 5 stars');
    }
  }

  /**
   * Business logic: Update rating
   */
  updateStars(newStars: number): void {
    this.validateStars(newStars);
    this.stars = newStars;
    this.updatedAt = new Date();
  }

  /**
   * Business logic: Check if rating belongs to user
   */
  belongsToUser(userId: string): boolean {
    return this.userId === userId;
  }

  /**
   * Business logic: Check if rating is for specific recipe
   */
  isForRecipe(recipeId: string): boolean {
    return this.recipeId === recipeId;
  }
}
