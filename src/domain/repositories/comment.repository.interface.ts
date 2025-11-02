import { Comment } from '../entities/comment.entity';

/**
 * Repository Interface - Domain Layer
 * Defines the contract for Comment data access
 */
export interface ICommentRepository {
  create(comment: {
    recipeId: string;
    userId: string;
    text: string;
  }): Promise<Comment>;
  findById(id: string): Promise<Comment | null>;
  findByRecipeId(recipeId: string): Promise<Comment[]>;
  findByUserId(userId: string): Promise<Comment[]>;
  update(id: string, text: string): Promise<Comment | null>;
  delete(id: string): Promise<boolean>;
}
