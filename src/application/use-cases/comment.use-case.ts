import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import type { ICommentRepository } from '../../domain/repositories/comment.repository.interface';
import { Comment } from '../../domain/entities/comment.entity';
import { CreateCommentDto } from '../dtos/comment/create-comment.dto';
import { UpdateCommentDto } from '../dtos/comment/update-comment.dto';

/**
 * Use Case: Manage Comment Operations
 */
@Injectable()
export class CommentUseCase {
  constructor(private readonly commentRepository: ICommentRepository) {}

  async createComment(dto: CreateCommentDto): Promise<Comment> {
    return this.commentRepository.create({
      recipeId: dto.recipeId,
      userId: dto.userId,
      text: dto.text,
    });
  }

  async getCommentsByRecipeId(recipeId: string): Promise<Comment[]> {
    return this.commentRepository.findByRecipeId(recipeId);
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

  async deleteComment(id: string, userId: string): Promise<void> {
    const comment = await this.commentRepository.findById(id);

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    // Business logic: Only the owner can delete
    if (!comment.belongsToUser(userId)) {
      throw new ForbiddenException('You can only delete your own comments');
    }

    const deleted = await this.commentRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }
}
