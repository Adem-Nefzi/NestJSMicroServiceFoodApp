/**
 * Comment Entity - Domain Layer
 * Represents a user's comment on a recipe
 */
export class Comment {
  constructor(
    public readonly id: string,
    public readonly recipeId: string,
    public readonly userId: string,
    public text: string,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  /**
   * Business logic: Update comment text
   */
  updateText(newText: string): void {
    this.text = newText;
    this.updatedAt = new Date();
  }

  /**
   * Business logic: Check if comment belongs to user
   */
  belongsToUser(userId: string): boolean {
    return this.userId === userId;
  }

  /**
   * Business logic: Check if comment is for specific recipe
   */
  isForRecipe(recipeId: string): boolean {
    return this.recipeId === recipeId;
  }
}
