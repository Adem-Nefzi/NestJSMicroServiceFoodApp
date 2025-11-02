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
import { RecipeUseCase } from '../../application/use-cases/recipe.use-case';
import { CreateRecipeDto } from '../../application/dtos/recipe/create-recipe.dto';
import { UpdateRecipeDto } from '../../application/dtos/recipe/update-recipe.dto';
import { RecipeResponseDto } from '../../application/dtos/recipe/recipe-response.dto';
import { Recipe } from '../../domain/entities/recipe.entity';

/**
 * Recipe Controller - Interface Adapter Layer
 * Handles HTTP requests for Recipe operations
 */
@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeUseCase: RecipeUseCase) {}

  @Post()
  async create(@Body() dto: CreateRecipeDto): Promise<RecipeResponseDto> {
    const recipe = await this.recipeUseCase.createRecipe(dto);
    return this.mapToResponseDto(recipe);
  }

  @Get()
  async findAll(
    @Query('status') status?: 'pending' | 'approved' | 'rejected',
    @Query('category') category?: string,
    @Query('userId') userId?: string,
  ): Promise<RecipeResponseDto[]> {
    let recipes: Recipe[];

    if (status) {
      recipes = await this.recipeUseCase.getRecipesByStatus(status);
    } else if (category) {
      recipes = await this.recipeUseCase.getRecipesByCategory(category);
    } else if (userId) {
      recipes = await this.recipeUseCase.getRecipesByUserId(userId);
    } else {
      recipes = await this.recipeUseCase.getAllRecipes();
    }

    return recipes.map((recipe) => this.mapToResponseDto(recipe));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RecipeResponseDto> {
    const recipe = await this.recipeUseCase.getRecipeById(id);
    return this.mapToResponseDto(recipe);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateRecipeDto,
  ): Promise<RecipeResponseDto> {
    const recipe = await this.recipeUseCase.updateRecipe(id, dto);
    return this.mapToResponseDto(recipe);
  }

  @Put(':id/approve')
  async approve(@Param('id') id: string): Promise<RecipeResponseDto> {
    const recipe = await this.recipeUseCase.approveRecipe(id);
    return this.mapToResponseDto(recipe);
  }

  @Put(':id/reject')
  async reject(@Param('id') id: string): Promise<RecipeResponseDto> {
    const recipe = await this.recipeUseCase.rejectRecipe(id);
    return this.mapToResponseDto(recipe);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.recipeUseCase.deleteRecipe(id);
  }

  private mapToResponseDto(recipe: Recipe): RecipeResponseDto {
    return {
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      imageUrl: recipe.imageUrl,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      category: recipe.category,
      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      difficulty: recipe.difficulty,
      userId: recipe.userId,
      averageRating: recipe.averageRating,
      status: recipe.status,
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt,
    };
  }
}
