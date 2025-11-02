import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rating } from '../../domain/entities/rating.entity';
import { IRatingRepository } from '../../domain/repositories/rating.repository.interface';
import { RatingSchema } from '../database/schemas/rating.schema';

/**
 * MongoDB Implementation of Rating Repository
 */
@Injectable()
export class RatingRepository implements IRatingRepository {
  constructor(
    @InjectModel(RatingSchema.name)
    private readonly ratingModel: Model<RatingSchema>,
  ) {}

  async create(rating: {
    recipeId: string;
    userId: string;
    stars: number;
  }): Promise<Rating> {
    const createdRating = new this.ratingModel(rating);
    const saved = await createdRating.save();
    return this.mapToEntity(saved);
  }

  async findById(id: string): Promise<Rating | null> {
    const rating = await this.ratingModel.findById(id).exec();
    return rating ? this.mapToEntity(rating) : null;
  }

  async findByRecipeId(recipeId: string): Promise<Rating[]> {
    const ratings = await this.ratingModel.find({ recipeId }).exec();
    return ratings.map((rating) => this.mapToEntity(rating));
  }

  async findByUserId(userId: string): Promise<Rating[]> {
    const ratings = await this.ratingModel.find({ userId }).exec();
    return ratings.map((rating) => this.mapToEntity(rating));
  }

  async findByUserAndRecipe(
    userId: string,
    recipeId: string,
  ): Promise<Rating | null> {
    const rating = await this.ratingModel.findOne({ userId, recipeId }).exec();
    return rating ? this.mapToEntity(rating) : null;
  }

  async update(id: string, stars: number): Promise<Rating | null> {
    const updated = await this.ratingModel
      .findByIdAndUpdate(id, { stars, updatedAt: new Date() }, { new: true })
      .exec();
    return updated ? this.mapToEntity(updated) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.ratingModel.findByIdAndDelete(id).exec();
    return !!result;
  }

  async calculateAverageRating(recipeId: string): Promise<number> {
    const ratings = await this.ratingModel.find({ recipeId }).exec();

    if (ratings.length === 0) {
      return 0;
    }

    const sum = ratings.reduce((acc, rating) => acc + rating.stars, 0);
    return sum / ratings.length;
  }

  private mapToEntity(doc: RatingSchema): Rating {
    return new Rating(
      String(doc._id),
      doc.recipeId,
      doc.userId,
      doc.stars,
      doc.createdAt,
      doc.updatedAt,
    );
  }
}
