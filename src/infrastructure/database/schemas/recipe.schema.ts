import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * MongoDB Schema for Recipe
 * Infrastructure layer - framework-specific
 */
@Schema({ timestamps: true, collection: 'recipes' })
export class RecipeSchema extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ type: [String], required: true })
  ingredients: string[];

  @Prop({ type: [String], required: true })
  steps: string[];

  @Prop({
    required: true,
    enum: ['main-course', 'dessert', 'appetizer', 'soup', 'salad'],
  })
  category: string;

  @Prop({ required: true })
  prepTime: number;

  @Prop({ required: true })
  cookTime: number;

  @Prop({ required: true, enum: ['easy', 'medium', 'hard'] })
  difficulty: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ default: 0 })
  averageRating: number;

  @Prop({
    required: true,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  })
  status: string;

  createdAt: Date;
  updatedAt: Date;
}

export const RecipeMongoSchema = SchemaFactory.createForClass(RecipeSchema);
