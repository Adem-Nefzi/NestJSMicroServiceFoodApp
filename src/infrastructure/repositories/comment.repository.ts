import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from '../../domain/entities/comment.entity';
import { ICommentRepository } from '../../domain/repositories/comment.repository.interface';
import { CommentSchema } from '../database/schemas/comment.schema';

/**
 * MongoDB Implementation of Comment Repository
 */
@Injectable()
export class CommentRepository implements ICommentRepository {
  constructor(
    @InjectModel(CommentSchema.name)
    private readonly commentModel: Model<CommentSchema>,
  ) {}

  async create(comment: {
    recipeId: string;
    userId: string;
    text: string;
  }): Promise<Comment> {
    const createdComment = new this.commentModel(comment);
    const saved = await createdComment.save();
    return this.mapToEntity(saved);
  }

  async findById(id: string): Promise<Comment | null> {
    const comment = await this.commentModel.findById(id).exec();
    return comment ? this.mapToEntity(comment) : null;
  }

  async findByRecipeId(recipeId: string): Promise<Comment[]> {
    const comments = await this.commentModel.find({ recipeId }).exec();
    return comments.map((comment) => this.mapToEntity(comment));
  }

  async findByUserId(userId: string): Promise<Comment[]> {
    const comments = await this.commentModel.find({ userId }).exec();
    return comments.map((comment) => this.mapToEntity(comment));
  }

  async update(id: string, text: string): Promise<Comment | null> {
    const updated = await this.commentModel
      .findByIdAndUpdate(id, { text, updatedAt: new Date() }, { new: true })
      .exec();
    return updated ? this.mapToEntity(updated) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.commentModel.findByIdAndDelete(id).exec();
    return !!result;
  }

  private mapToEntity(doc: CommentSchema): Comment {
    return new Comment(
      String(doc._id),
      doc.recipeId,
      doc.userId,
      doc.text,
      doc.createdAt,
      doc.updatedAt,
    );
  }
}
