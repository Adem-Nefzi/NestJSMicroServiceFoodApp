import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { CommentUseCase } from '../../application/use-cases/comment.use-case';
import { CreateCommentDto } from '../../application/dtos/comment/create-comment.dto';
import { UpdateCommentDto } from '../../application/dtos/comment/update-comment.dto';
import { CommentResponseDto } from '../../application/dtos/comment/comment-response.dto';
import { Comment } from '../../domain/entities/comment.entity';

/**
 * Comment Controller - Interface Adapter Layer
 */
@Controller('comments')
export class CommentController {
  constructor(private readonly commentUseCase: CommentUseCase) {}

  @Post()
  async create(@Body() dto: CreateCommentDto): Promise<CommentResponseDto> {
    const comment = await this.commentUseCase.createComment(dto);
    return this.mapToResponseDto(comment);
  }

  @Get('recipe/:recipeId')
  async getCommentsByRecipe(
    @Param('recipeId') recipeId: string,
  ): Promise<CommentResponseDto[]> {
    const comments = await this.commentUseCase.getCommentsByRecipeId(recipeId);
    return comments.map((comment) => this.mapToResponseDto(comment));
  }

  @Get('recipe/:recipeId/tree')
  async getCommentsWithReplies(
    @Param('recipeId') recipeId: string,
  ): Promise<CommentResponseDto[]> {
    return this.commentUseCase.getCommentsWithReplies(recipeId);
  }

  @Get('user/:userId')
  async getCommentsByUser(
    @Param('userId') userId: string,
  ): Promise<CommentResponseDto[]> {
    const comments = await this.commentUseCase.getCommentsByUserId(userId);
    return comments.map((comment) => this.mapToResponseDto(comment));
  }

  @Get(':commentId/replies')
  async getReplies(
    @Param('commentId') commentId: string,
  ): Promise<CommentResponseDto[]> {
    const replies = await this.commentUseCase.getRepliesByCommentId(commentId);
    return replies.map((reply) => this.mapToResponseDto(reply));
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Query('userId') userId: string,
    @Body() dto: UpdateCommentDto,
  ): Promise<CommentResponseDto> {
    const comment = await this.commentUseCase.updateComment(id, userId, dto);
    return this.mapToResponseDto(comment);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Query('userId') userId: string,
    @Query('deleteReplies') deleteReplies?: string,
  ): Promise<void> {
    const shouldDeleteReplies = deleteReplies !== 'false';
    await this.commentUseCase.deleteComment(id, userId, shouldDeleteReplies);
  }

  private mapToResponseDto(comment: Comment): CommentResponseDto {
    return {
      id: comment.id,
      recipeId: comment.recipeId,
      userId: comment.userId,
      text: comment.text,
      parentCommentId: comment.parentCommentId,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    };
  }
}
