/**
 * Favorite Entity - Domain Layer
 * Represents a user's saved recipe
 */
export class Favorite {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly recipeId: string,
    public readonly createdAt: Date,
  ) {}

  /**
   * Business logic: Check if favorite belongs to user
   */
  belongsToUser(userId: string): boolean {
    return this.userId === userId;
  }
}
