/**
 * Comment Entity - Domain Layer
 * Represents a user's comment on a recipe
 * Supports nested replies via parentCommentId
 */
export class Comment {
  constructor(
    public readonly id: string,
    public readonly recipeId: string,
    public readonly userId: string,
    public text: string,
    public readonly parentCommentId: string | null,
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

  /**
   * Business logic: Check if this is a top-level comment
   */
  isTopLevel(): boolean {
    return this.parentCommentId === null;
  }

  /**
   * Business logic: Check if this is a reply to another comment
   */
  isReply(): boolean {
    return this.parentCommentId !== null;
  }

  /**
   * Business logic: Check if this is a reply to a specific comment
   */
  isReplyTo(commentId: string): boolean {
    return this.parentCommentId === commentId;
  }
}
