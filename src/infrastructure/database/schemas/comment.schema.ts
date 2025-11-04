import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * MongoDB Schema for Comment
 * Supports nested replies via parentCommentId
 */
@Schema({ timestamps: true, collection: 'comments' })
export class CommentSchema extends Document {
  @Prop({ required: true })
  recipeId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  text: string;

  @Prop({ default: null })
  parentCommentId: string | null;

  createdAt: Date;
  updatedAt: Date;
}

export const CommentMongoSchema = SchemaFactory.createForClass(CommentSchema);
