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
    parentCommentId?: string | null;
  }): Promise<Comment>;
  findById(id: string): Promise<Comment | null>;
  findByRecipeId(recipeId: string): Promise<Comment[]>;
  findByUserId(userId: string): Promise<Comment[]>;
  findByParentId(parentCommentId: string): Promise<Comment[]>;
  findRepliesRecursive(commentId: string): Promise<Comment[]>;
  update(id: string, text: string): Promise<Comment | null>;
  delete(id: string): Promise<boolean>;
  deleteWithReplies(id: string): Promise<boolean>;
}
