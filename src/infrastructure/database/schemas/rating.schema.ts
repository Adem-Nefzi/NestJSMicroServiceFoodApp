import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * MongoDB Schema for Rating
 */
@Schema({ timestamps: true, collection: 'ratings' })
export class RatingSchema extends Document {
  @Prop({ required: true })
  recipeId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, min: 1, max: 5 })
  stars: number;

  createdAt: Date;
  updatedAt: Date;
}

export const RatingMongoSchema = SchemaFactory.createForClass(RatingSchema);

// Create compound index for unique user-recipe combination
RatingMongoSchema.index({ userId: 1, recipeId: 1 }, { unique: true });
