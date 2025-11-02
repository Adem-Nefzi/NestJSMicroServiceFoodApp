import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import type { IRatingRepository } from '../../domain/repositories/rating.repository.interface';
import type { IRecipeRepository } from '../../domain/repositories/recipe.repository.interface';
import { Rating } from '../../domain/entities/rating.entity';
import { CreateRatingDto } from '../dtos/rating/create-rating.dto';
import { UpdateRatingDto } from '../dtos/rating/update-rating.dto';

/**
 * Use Case: Manage Rating Operations
 */
@Injectable()
export class RatingUseCase {
  constructor(
    private readonly ratingRepository: IRatingRepository,
    private readonly recipeRepository: IRecipeRepository,
  ) {}

  async createOrUpdateRating(dto: CreateRatingDto): Promise<Rating> {
    // Business logic: Check if user already rated this recipe
    const existing = await this.ratingRepository.findByUserAndRecipe(
      dto.userId,
      dto.recipeId,
    );

    let rating: Rating;

    if (existing) {
      // Update existing rating using entity business logic
      existing.updateStars(dto.stars);
      const updated = await this.ratingRepository.update(
        existing.id,
        dto.stars,
      );
      if (!updated) {
        throw new NotFoundException('Rating not found');
      }
      rating = updated;
    } else {
      // Create new rating
      rating = await this.ratingRepository.create({
        recipeId: dto.recipeId,
        userId: dto.userId,
        stars: dto.stars,
      });
    }

    // Business logic: Update recipe's average rating
    await this.updateRecipeAverageRating(dto.recipeId);

    return rating;
  }

  async getRatingsByRecipeId(recipeId: string): Promise<Rating[]> {
    return this.ratingRepository.findByRecipeId(recipeId);
  }

  async getRatingsByUserId(userId: string): Promise<Rating[]> {
    return this.ratingRepository.findByUserId(userId);
  }

  async getUserRatingForRecipe(
    userId: string,
    recipeId: string,
  ): Promise<Rating | null> {
    return this.ratingRepository.findByUserAndRecipe(userId, recipeId);
  }

  async updateRating(
    id: string,
    userId: string,
    dto: UpdateRatingDto,
  ): Promise<Rating> {
    const rating = await this.ratingRepository.findById(id);

    if (!rating) {
      throw new NotFoundException(`Rating with ID ${id} not found`);
    }

    // Business logic: Only the owner can update
    if (!rating.belongsToUser(userId)) {
      throw new ForbiddenException('You can only update your own ratings');
    }

    // Business logic: Update rating using entity method
    rating.updateStars(dto.stars);

    const updated = await this.ratingRepository.update(id, dto.stars);
    if (!updated) {
      throw new NotFoundException(`Rating with ID ${id} not found`);
    }

    // Business logic: Update recipe's average rating
    await this.updateRecipeAverageRating(rating.recipeId);

    return updated;
  }

  async deleteRating(id: string, userId: string): Promise<void> {
    const rating = await this.ratingRepository.findById(id);

    if (!rating) {
      throw new NotFoundException(`Rating with ID ${id} not found`);
    }

    // Business logic: Only the owner can delete
    if (!rating.belongsToUser(userId)) {
      throw new ForbiddenException('You can only delete your own ratings');
    }

    const recipeId = rating.recipeId;
    const deleted = await this.ratingRepository.delete(id);

    if (!deleted) {
      throw new NotFoundException(`Rating with ID ${id} not found`);
    }

    // Business logic: Update recipe's average rating after deletion
    await this.updateRecipeAverageRating(recipeId);
  }

  /**
   * Private helper: Update recipe's average rating
   */
  private async updateRecipeAverageRating(recipeId: string): Promise<void> {
    const averageRating =
      await this.ratingRepository.calculateAverageRating(recipeId);
    await this.recipeRepository.updateAverageRating(recipeId, averageRating);
  }
}
