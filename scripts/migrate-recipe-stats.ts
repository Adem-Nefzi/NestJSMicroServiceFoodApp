import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecipeSchema } from '../src/infrastructure/database/schemas/recipe.schema';
import { FavoriteSchema } from '../src/infrastructure/database/schemas/favorite.schema';
import { RatingSchema } from '../src/infrastructure/database/schemas/rating.schema';

/**
 * Migration Script: Initialize totalFavorites and totalRatings for existing recipes
 * Run this ONCE after deploying the new fields
 *
 * Usage: npx ts-node scripts/migrate-recipe-stats.ts
 */
async function migrateRecipeStats() {
  console.log('🚀 Starting migration: Initialize recipe stats...\n');

  const app = await NestFactory.createApplicationContext(AppModule);

  const recipeModel = app.get<Model<RecipeSchema>>(
    getModelToken(RecipeSchema.name),
  );
  const favoriteModel = app.get<Model<FavoriteSchema>>(
    getModelToken(FavoriteSchema.name),
  );
  const ratingModel = app.get<Model<RatingSchema>>(
    getModelToken(RatingSchema.name),
  );

  const recipes = await recipeModel.find().exec();
  console.log(`📋 Found ${recipes.length} recipes to migrate\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const recipe of recipes) {
    try {
      // Count existing favorites
      const favCount = await favoriteModel
        .countDocuments({ recipeId: String(recipe._id) })
        .exec();

      // Count existing ratings
      const ratingCount = await ratingModel
        .countDocuments({ recipeId: String(recipe._id) })
        .exec();

      // Update recipe with atomic operation
      await recipeModel
        .updateOne(
          { _id: recipe._id },
          {
            $set: {
              totalFavorites: favCount,
              totalRatings: ratingCount,
            },
          },
        )
        .exec();

      console.log(
        `✅ Recipe "${recipe.title}" - Favorites: ${favCount}, Ratings: ${ratingCount}`,
      );
      successCount++;
    } catch (error) {
      console.error(`❌ Error migrating recipe "${recipe.title}":`, error);
      errorCount++;
    }
  }

  console.log('\n📊 Migration Summary:');
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   📝 Total: ${recipes.length}`);

  await app.close();
  console.log('\n✨ Migration completed!\n');
}

// Run migration
migrateRecipeStats()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('💥 Migration failed:', error);
    process.exit(1);
  });
