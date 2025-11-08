import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recipe } from '../../domain/entities/recipe.entity';
import { IRecipeRepository } from '../../domain/repositories/recipe.repository.interface';
import { RecipeSchema } from '../database/schemas/recipe.schema';

/**
 * MongoDB Implementation of Recipe Repository
 * Infrastructure layer - connects domain to MongoDB
 */
@Injectable()
export class RecipeRepository implements IRecipeRepository {
  constructor(
    @InjectModel(RecipeSchema.name)
    private readonly recipeModel: Model<RecipeSchema>,
  ) {}

  async create(recipe: {
    title: string;
    description: string;
    imageUrl: string;
    ingredients: string[];
    steps: string[];
    category: string;
    prepTime: number;
    cookTime: number;
    difficulty: string;
    userId: string;
    status: 'pending' | 'approved' | 'rejected';
  }): Promise<Recipe> {
    const createdRecipe = new this.recipeModel({
      ...recipe,
      averageRating: 0,
      status: 'pending',
    });
    const saved = await createdRecipe.save();
    return this.mapToEntity(saved);
  }

  async findById(id: string): Promise<Recipe | null> {
    const recipe = await this.recipeModel.findById(id).exec();
    return recipe ? this.mapToEntity(recipe) : null;
  }

  async findAll(): Promise<Recipe[]> {
    const recipes = await this.recipeModel.find().exec();
    return recipes.map((recipe) => this.mapToEntity(recipe));
  }

  async findByUserId(userId: string): Promise<Recipe[]> {
    const recipes = await this.recipeModel.find({ userId }).exec();
    return recipes.map((recipe) => this.mapToEntity(recipe));
  }

  async findByStatus(
    status: 'pending' | 'approved' | 'rejected',
  ): Promise<Recipe[]> {
    const recipes = await this.recipeModel.find({ status }).exec();
    return recipes.map((recipe) => this.mapToEntity(recipe));
  }

  async findByCategory(category: string): Promise<Recipe[]> {
    const recipes = await this.recipeModel.find({ category }).exec();
    return recipes.map((recipe) => this.mapToEntity(recipe));
  }

  async update(id: string, recipe: Partial<Recipe>): Promise<Recipe | null> {
    const updated = await this.recipeModel
      .findByIdAndUpdate(
        id,
        { ...recipe, updatedAt: new Date() },
        { new: true },
      )
      .exec();
    return updated ? this.mapToEntity(updated) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.recipeModel.findByIdAndDelete(id).exec();
    return !!result;
  }

  async updateAverageRating(
    recipeId: string,
    averageRating: number,
  ): Promise<void> {
    await this.recipeModel
      .findByIdAndUpdate(recipeId, { averageRating })
      .exec();
  }

  /**
   * Atomically increment totalFavorites counter
   */
  async incrementFavorites(recipeId: string): Promise<void> {
    await this.recipeModel
      .updateOne({ _id: recipeId }, { $inc: { totalFavorites: 1 } })
      .exec();
  }

  /**
   * Atomically decrement totalFavorites counter (never below 0)
   */
  async decrementFavorites(recipeId: string): Promise<void> {
    await this.recipeModel
      .updateOne(
        { _id: recipeId, totalFavorites: { $gt: 0 } },
        { $inc: { totalFavorites: -1 } },
      )
      .exec();
  }

  /**
   * Atomically increment totalRatings counter
   */
  async incrementRatings(recipeId: string): Promise<void> {
    await this.recipeModel
      .updateOne({ _id: recipeId }, { $inc: { totalRatings: 1 } })
      .exec();
  }

  /**
   * Atomically decrement totalRatings counter (never below 0)
   */
  async decrementRatings(recipeId: string): Promise<void> {
    await this.recipeModel
      .updateOne(
        { _id: recipeId, totalRatings: { $gt: 0 } },
        { $inc: { totalRatings: -1 } },
      )
      .exec();
  }

  /**
   * Map MongoDB document to Domain Entity
   */
  private mapToEntity(doc: RecipeSchema): Recipe {
    return new Recipe(
      String(doc._id),
      doc.title,
      doc.description,
      doc.imageUrl,
      doc.ingredients,
      doc.steps,
      doc.category as
        | 'main-course'
        | 'dessert'
        | 'appetizer'
        | 'soup'
        | 'salad',
      doc.prepTime,
      doc.cookTime,
      doc.difficulty as 'easy' | 'medium' | 'hard',
      doc.userId,
      doc.averageRating || 0,
      doc.totalFavorites || 0,
      doc.totalRatings || 0,
      doc.status as 'pending' | 'approved' | 'rejected',
      doc.createdAt,
      doc.updatedAt,
    );
  }
}
