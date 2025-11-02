import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Favorite } from '../../domain/entities/favorite.entity';
import { IFavoriteRepository } from '../../domain/repositories/favorite.repository.interface';
import { FavoriteSchema } from '../database/schemas/favorite.schema';

/**
 * MongoDB Implementation of Favorite Repository
 */
@Injectable()
export class FavoriteRepository implements IFavoriteRepository {
  constructor(
    @InjectModel(FavoriteSchema.name)
    private readonly favoriteModel: Model<FavoriteSchema>,
  ) {}

  async create(favorite: {
    userId: string;
    recipeId: string;
  }): Promise<Favorite> {
    const createdFavorite = new this.favoriteModel(favorite);
    const saved = await createdFavorite.save();
    return this.mapToEntity(saved);
  }

  async findById(id: string): Promise<Favorite | null> {
    const favorite = await this.favoriteModel.findById(id).exec();
    return favorite ? this.mapToEntity(favorite) : null;
  }

  async findByUserId(userId: string): Promise<Favorite[]> {
    const favorites = await this.favoriteModel.find({ userId }).exec();
    return favorites.map((favorite) => this.mapToEntity(favorite));
  }

  async findByUserAndRecipe(
    userId: string,
    recipeId: string,
  ): Promise<Favorite | null> {
    const favorite = await this.favoriteModel
      .findOne({ userId, recipeId })
      .exec();
    return favorite ? this.mapToEntity(favorite) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.favoriteModel.findByIdAndDelete(id).exec();
    return !!result;
  }

  async deleteByUserAndRecipe(
    userId: string,
    recipeId: string,
  ): Promise<boolean> {
    const result = await this.favoriteModel
      .deleteOne({ userId, recipeId })
      .exec();
    return result.deletedCount > 0;
  }

  private mapToEntity(doc: FavoriteSchema): Favorite {
    return new Favorite(
      String(doc._id),
      doc.userId,
      doc.recipeId,
      doc.createdAt,
    );
  }
}
