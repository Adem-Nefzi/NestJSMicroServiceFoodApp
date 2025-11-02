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
import { RatingUseCase } from '../../application/use-cases/rating.use-case';
import { CreateRatingDto } from '../../application/dtos/rating/create-rating.dto';
import { UpdateRatingDto } from '../../application/dtos/rating/update-rating.dto';
import { RatingResponseDto } from '../../application/dtos/rating/rating-response.dto';
import { Rating } from '../../domain/entities/rating.entity';

/**
 * Rating Controller - Interface Adapter Layer
 */
@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingUseCase: RatingUseCase) {}

  @Post()
  async createOrUpdate(
    @Body() dto: CreateRatingDto,
  ): Promise<RatingResponseDto> {
    const rating = await this.ratingUseCase.createOrUpdateRating(dto);
    return this.mapToResponseDto(rating);
  }

  @Get()
  async findByRecipeOrUser(
    @Query('recipeId') recipeId?: string,
    @Query('userId') userId?: string,
  ): Promise<RatingResponseDto[]> {
    let ratings: Rating[];

    if (recipeId) {
      ratings = await this.ratingUseCase.getRatingsByRecipeId(recipeId);
    } else if (userId) {
      ratings = await this.ratingUseCase.getRatingsByUserId(userId);
    } else {
      return [];
    }

    return ratings.map((rating) => this.mapToResponseDto(rating));
  }

  @Get('user-rating')
  async getUserRating(
    @Query('userId') userId: string,
    @Query('recipeId') recipeId: string,
  ): Promise<RatingResponseDto | null> {
    const rating = await this.ratingUseCase.getUserRatingForRecipe(
      userId,
      recipeId,
    );
    return rating ? this.mapToResponseDto(rating) : null;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Query('userId') userId: string,
    @Body() dto: UpdateRatingDto,
  ): Promise<RatingResponseDto> {
    const rating = await this.ratingUseCase.updateRating(id, userId, dto);
    return this.mapToResponseDto(rating);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Query('userId') userId: string,
  ): Promise<void> {
    await this.ratingUseCase.deleteRating(id, userId);
  }

  private mapToResponseDto(rating: Rating): RatingResponseDto {
    return {
      id: rating.id,
      recipeId: rating.recipeId,
      userId: rating.userId,
      stars: rating.stars,
      createdAt: rating.createdAt,
      updatedAt: rating.updatedAt,
    };
  }
}
