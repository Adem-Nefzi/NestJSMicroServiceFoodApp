import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import type { ICommentRepository } from '../../domain/repositories/comment.repository.interface';
import { Comment } from '../../domain/entities/comment.entity';
import { CreateCommentDto } from '../dtos/comment/create-comment.dto';
import { UpdateCommentDto } from '../dtos/comment/update-comment.dto';
import { CommentResponseDto } from '../dtos/comment/comment-response.dto';

/**
 * Use Case: Manage Comment Operations with Nested Replies
 */
@Injectable()
export class CommentUseCase {
  private readonly MAX_NESTING_DEPTH = 3; // Limit reply depth

  constructor(private readonly commentRepository: ICommentRepository) {}

  async createComment(dto: CreateCommentDto): Promise<Comment> {
    // If this is a reply, validate parent comment exists
    if (dto.parentCommentId) {
      const parentComment = await this.commentRepository.findById(
        dto.parentCommentId,
      );
      if (!parentComment) {
        throw new NotFoundException(
          `Parent comment with ID ${dto.parentCommentId} not found`,
        );
      }

      // Check nesting depth to prevent infinite nesting
      const depth = await this.getCommentDepth(dto.parentCommentId);
      if (depth >= this.MAX_NESTING_DEPTH) {
        throw new BadRequestException(
          `Maximum nesting depth (${this.MAX_NESTING_DEPTH}) exceeded`,
        );
      }
    }

    return this.commentRepository.create({
      recipeId: dto.recipeId,
      userId: dto.userId,
      text: dto.text,
      parentCommentId: dto.parentCommentId || null,
    });
  }

  async getCommentsByRecipeId(recipeId: string): Promise<Comment[]> {
    return this.commentRepository.findByRecipeId(recipeId);
  }

  /**
   * Get comments with nested replies organized in a tree structure
   */
  async getCommentsWithReplies(
    recipeId: string,
  ): Promise<CommentResponseDto[]> {
    // Get all comments for this recipe
    const allComments = await this.commentRepository.findByRecipeId(recipeId);

    // Separate top-level comments and replies
    const topLevelComments = allComments.filter((c) => c.isTopLevel());
    const repliesMap = new Map<string, Comment[]>();

    // Group replies by parent
    allComments.forEach((comment) => {
      if (comment.isReply()) {
        const parentId = comment.parentCommentId;
        if (!repliesMap.has(parentId)) {
          repliesMap.set(parentId, []);
        }
        repliesMap.get(parentId).push(comment);
      }
    });

    // Build tree structure recursively
    return topLevelComments.map((comment) =>
      this.buildCommentTree(comment, repliesMap),
    );
  }

  /**
   * Helper: Build comment tree with nested replies
   */
  private buildCommentTree(
    comment: Comment,
    repliesMap: Map<string, Comment[]>,
  ): CommentResponseDto {
    const replies = repliesMap.get(comment.id) || [];

    return {
      id: comment.id,
      recipeId: comment.recipeId,
      userId: comment.userId,
      text: comment.text,
      parentCommentId: comment.parentCommentId,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      replies: replies.map((reply) => this.buildCommentTree(reply, repliesMap)),
    };
  }

  /**
   * Helper: Calculate comment nesting depth
   */
  private async getCommentDepth(commentId: string): Promise<number> {
    let depth = 0;
    let currentId: string | null = commentId;

    while (currentId) {
      const comment = await this.commentRepository.findById(currentId);
      if (!comment) break;
      depth++;
      currentId = comment.parentCommentId;
    }

    return depth;
  }

  async getCommentsByUserId(userId: string): Promise<Comment[]> {
    return this.commentRepository.findByUserId(userId);
  }

  async updateComment(
    id: string,
    userId: string,
    dto: UpdateCommentDto,
  ): Promise<Comment> {
    const comment = await this.commentRepository.findById(id);

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    // Business logic: Only the owner can update
    if (!comment.belongsToUser(userId)) {
      throw new ForbiddenException('You can only update your own comments');
    }

    // Business logic: Update comment using entity method
    comment.updateText(dto.text);

    const updated = await this.commentRepository.update(id, dto.text);
    if (!updated) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return updated;
  }

  async deleteComment(
    id: string,
    userId: string,
    deleteReplies = true,
  ): Promise<void> {
    const comment = await this.commentRepository.findById(id);

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    // Business logic: Only the owner can delete
    if (!comment.belongsToUser(userId)) {
      throw new ForbiddenException('You can only delete your own comments');
    }

    // Delete comment with or without replies
    const deleted = deleteReplies
      ? await this.commentRepository.deleteWithReplies(id)
      : await this.commentRepository.delete(id);

    if (!deleted) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }

  async getRepliesByCommentId(commentId: string): Promise<Comment[]> {
    return this.commentRepository.findByParentId(commentId);
  }
}
