import { Controller, Get, Post, Delete, Body, Query } from '@nestjs/common';
import { FavoriteUseCase } from '../../application/use-cases/favorite.use-case';
import { CreateFavoriteDto } from '../../application/dtos/favorite/create-favorite.dto';
import { FavoriteResponseDto } from '../../application/dtos/favorite/favorite-response.dto';
import { Favorite } from '../../domain/entities/favorite.entity';

/**
 * Favorite Controller - Interface Adapter Layer
 */
@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favoriteUseCase: FavoriteUseCase) {}

  @Post()
  async create(@Body() dto: CreateFavoriteDto): Promise<FavoriteResponseDto> {
    const favorite = await this.favoriteUseCase.addFavorite(dto);
    return this.mapToResponseDto(favorite);
  }

  @Get()
  async findByUser(
    @Query('userId') userId: string,
  ): Promise<FavoriteResponseDto[]> {
    const favorites = await this.favoriteUseCase.getFavoritesByUserId(userId);
    return favorites.map((favorite) => this.mapToResponseDto(favorite));
  }

  @Get('check')
  async checkFavorite(
    @Query('userId') userId: string,
    @Query('recipeId') recipeId: string,
  ): Promise<{ isFavorite: boolean }> {
    const isFavorite = await this.favoriteUseCase.checkIfFavorite(
      userId,
      recipeId,
    );
    return { isFavorite };
  }

  @Delete()
  async remove(
    @Query('userId') userId: string,
    @Query('recipeId') recipeId: string,
  ): Promise<void> {
    await this.favoriteUseCase.removeFavorite(userId, recipeId);
  }

  private mapToResponseDto(favorite: Favorite): FavoriteResponseDto {
    return {
      id: favorite.id,
      userId: favorite.userId,
      recipeId: favorite.recipeId,
      createdAt: favorite.createdAt,
    };
  }
}
