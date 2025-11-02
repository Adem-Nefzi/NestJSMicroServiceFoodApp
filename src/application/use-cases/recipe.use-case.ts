import { Injectable, NotFoundException } from '@nestjs/common';
import type { IRecipeRepository } from '../../domain/repositories/recipe.repository.interface';
import { Recipe } from '../../domain/entities/recipe.entity';
import { CreateRecipeDto } from '../dtos/recipe/create-recipe.dto';
import { UpdateRecipeDto } from '../dtos/recipe/update-recipe.dto';

/**
 * Use Case: Manage Recipe Operations
 * Application Layer - contains business logic
 */
@Injectable()
export class RecipeUseCase {
  constructor(private readonly recipeRepository: IRecipeRepository) {}

  async createRecipe(dto: CreateRecipeDto): Promise<Recipe> {
    const recipe = await this.recipeRepository.create({
      title: dto.title,
      description: dto.description,
      imageUrl: dto.imageUrl,
      ingredients: dto.ingredients,
      steps: dto.steps,
      category: dto.category,
      prepTime: dto.prepTime,
      cookTime: dto.cookTime,
      difficulty: dto.difficulty,
      userId: dto.userId,
      status: 'pending',
    });

    return recipe;
  }

  async getRecipeById(id: string): Promise<Recipe> {
    const recipe = await this.recipeRepository.findById(id);
    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }
    return recipe;
  }

  async getAllRecipes(): Promise<Recipe[]> {
    return this.recipeRepository.findAll();
  }

  async getRecipesByUserId(userId: string): Promise<Recipe[]> {
    return this.recipeRepository.findByUserId(userId);
  }

  async getRecipesByStatus(
    status: 'pending' | 'approved' | 'rejected',
  ): Promise<Recipe[]> {
    return this.recipeRepository.findByStatus(status);
  }

  async getRecipesByCategory(category: string): Promise<Recipe[]> {
    return this.recipeRepository.findByCategory(category);
  }

  async updateRecipe(id: string, dto: UpdateRecipeDto): Promise<Recipe> {
    const recipe = await this.getRecipeById(id);

    // Business logic: Update recipe using entity method
    recipe.updateDetails(dto);

    const updated = await this.recipeRepository.update(id, recipe);
    if (!updated) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }
    return updated;
  }

  async approveRecipe(id: string): Promise<Recipe> {
    const recipe = await this.getRecipeById(id);

    // Business logic: Approve using entity method
    recipe.approve();

    const updated = await this.recipeRepository.update(id, recipe);
    if (!updated) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }
    return updated;
  }

  async rejectRecipe(id: string): Promise<Recipe> {
    const recipe = await this.getRecipeById(id);

    // Business logic: Reject using entity method
    recipe.reject();

    const updated = await this.recipeRepository.update(id, recipe);
    if (!updated) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }
    return updated;
  }

  async deleteRecipe(id: string): Promise<void> {
    const deleted = await this.recipeRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }
  }
}
