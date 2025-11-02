import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * MongoDB Schema for Favorite
 */
@Schema({ timestamps: true, collection: 'favorites' })
export class FavoriteSchema extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  recipeId: string;

  createdAt: Date;
}

export const FavoriteMongoSchema = SchemaFactory.createForClass(FavoriteSchema);

// Create compound index for unique user-recipe combination
FavoriteMongoSchema.index({ userId: 1, recipeId: 1 }, { unique: true });
