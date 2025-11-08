/**
 * Recipe Entity - Domain Layer
 * Represents the core business model for a Recipe
 * This is framework-agnostic and contains only business logic
 */
export class Recipe {
  constructor(
    public readonly id: string,
    public title: string,
    public description: string,
    public imageUrl: string,
    public ingredients: string[],
    public steps: string[],
    public category: 'main-course' | 'dessert' | 'appetizer' | 'soup' | 'salad',
    public prepTime: number, // in minutes
    public cookTime: number, // in minutes
    public difficulty: 'easy' | 'medium' | 'hard',
    public userId: string, // Reference to user who created it
    public averageRating: number,
    public totalFavorites: number,
    public totalRatings: number,
    public status: 'pending' | 'approved' | 'rejected',
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  /**
   * Business logic: Calculate total time
   */
  getTotalTime(): number {
    return this.prepTime + this.cookTime;
  }

  /**
   * Business logic: Check if recipe is approved
   */
  isApproved(): boolean {
    return this.status === 'approved';
  }

  /**
   * Business logic: Update recipe details
   */
  updateDetails(
    updates: Partial<Omit<Recipe, 'id' | 'createdAt' | 'userId'>>,
  ): void {
    Object.assign(this, updates);
    this.updatedAt = new Date();
  }

  /**
   * Business logic: Approve recipe
   */
  approve(): void {
    this.status = 'approved';
    this.updatedAt = new Date();
  }

  /**
   * Business logic: Reject recipe
   */
  reject(): void {
    this.status = 'rejected';
    this.updatedAt = new Date();
  }
}
