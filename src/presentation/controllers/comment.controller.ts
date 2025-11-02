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

  @Get()
  async findByRecipeOrUser(
    @Query('recipeId') recipeId?: string,
    @Query('userId') userId?: string,
  ): Promise<CommentResponseDto[]> {
    let comments: Comment[];

    if (recipeId) {
      comments = await this.commentUseCase.getCommentsByRecipeId(recipeId);
    } else if (userId) {
      comments = await this.commentUseCase.getCommentsByUserId(userId);
    } else {
      return [];
    }

    return comments.map((comment) => this.mapToResponseDto(comment));
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
  ): Promise<void> {
    await this.commentUseCase.deleteComment(id, userId);
  }

  private mapToResponseDto(comment: Comment): CommentResponseDto {
    return {
      id: comment.id,
      recipeId: comment.recipeId,
      userId: comment.userId,
      text: comment.text,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    };
  }
}
