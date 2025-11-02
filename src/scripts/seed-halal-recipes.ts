import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppModule } from '../app.module';
import { RecipeSchema } from '../infrastructure/database/schemas/recipe.schema';

interface SeedRecipe {
  title: string;
  description: string;
  imageUrl: string;
  ingredients: string[];
  steps: string[];
  category: 'main-course' | 'dessert' | 'appetizer' | 'soup' | 'salad';
  prepTime: number;
  cookTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  userId: string;
  averageRating: number;
  status: 'pending' | 'approved' | 'rejected';
}

const halalRecipes: SeedRecipe[] = [
  {
    title: 'Chicken Biryani',
    description:
      'Layered basmati rice with spiced halal chicken, caramelized onions, and saffron for a celebratory main course.',
    imageUrl:
      'https://images.unsplash.com/photo-1604908177575-82c89bd81d02?auto=format&fit=crop&w=1200&q=80',
    ingredients: [
      '2 cups basmati rice',
      '1.5 lb halal chicken thighs, bone-in',
      '1 cup yogurt',
      '2 onions, sliced',
      '3 tomatoes, chopped',
      '1/4 cup fresh cilantro',
      '1/4 cup fresh mint',
      '2 tbsp biryani masala',
      '1 tsp saffron soaked in warm milk',
      'Ghee, salt, whole spices',
    ],
    steps: [
      'Marinate chicken in yogurt, biryani masala, and salt for at least 1 hour.',
      'Fry sliced onions in ghee until golden and set aside.',
      'Cook chicken with tomatoes, herbs, and spices until tender.',
      'Parboil rice with whole spices until 70% cooked.',
      'Layer rice and chicken, top with saffron milk and fried onions, then steam on low heat for 20 minutes.',
    ],
    category: 'main-course',
    prepTime: 35,
    cookTime: 45,
    difficulty: 'medium',
    userId: 'seed-user-0001',
    averageRating: 4.8,
    status: 'approved',
  },
  {
    title: 'Lamb Tagine with Apricots',
    description:
      'Slow-cooked Moroccan lamb tagine with sweet apricots, warm spices, and toasted almonds.',
    imageUrl:
      'https://images.unsplash.com/photo-1589308078055-187563e35c46?auto=format&fit=crop&w=1200&q=80',
    ingredients: [
      '2 lb halal lamb shoulder, cubed',
      '1 onion, finely chopped',
      '2 cloves garlic, minced',
      '1 cup dried apricots',
      '1/2 cup almonds, toasted',
      '2 tbsp ras el hanout',
      '1 tsp ground cinnamon',
      '2 cups beef stock',
      'Olive oil, salt, pepper',
    ],
    steps: [
      'Season lamb with salt, pepper, and ras el hanout.',
      'Brown lamb in olive oil, then remove from pot.',
      'Sauté onions and garlic until translucent.',
      'Return lamb, add spices, apricots, and stock, then simmer covered for 1.5 hours.',
      'Garnish with toasted almonds and serve with couscous.',
    ],
    category: 'main-course',
    prepTime: 20,
    cookTime: 105,
    difficulty: 'medium',
    userId: 'seed-user-0002',
    averageRating: 4.7,
    status: 'approved',
  },
  {
    title: 'Grilled Chicken Shawarma Bowls',
    description:
      'Marinated halal chicken grilled and served over herbed rice with crisp vegetables and garlic sauce.',
    imageUrl:
      'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1200&q=80',
    ingredients: [
      '2 lb halal chicken breast, sliced',
      '1/2 cup yogurt',
      '3 tbsp shawarma spice blend',
      '3 cloves garlic, minced',
      '2 tbsp lemon juice',
      'Herbed basmati rice',
      'Cucumber, tomatoes, pickled onions',
      'Garlic tahini sauce',
    ],
    steps: [
      'Combine yogurt, garlic, lemon juice, and spices, then marinate chicken for 2 hours.',
      'Grill chicken over medium-high heat until charred and cooked through.',
      'Prepare herbed rice and chop vegetables.',
      'Assemble bowls with rice, chicken, and vegetables.',
      'Drizzle with garlic tahini sauce before serving.',
    ],
    category: 'main-course',
    prepTime: 25,
    cookTime: 20,
    difficulty: 'easy',
    userId: 'seed-user-0001',
    averageRating: 4.6,
    status: 'approved',
  },
  {
    title: 'Harira Lentil Soup',
    description:
      'Hearty Moroccan soup made with halal beef, lentils, chickpeas, and warming spices.',
    imageUrl:
      'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=1200&q=80',
    ingredients: [
      '1/2 lb halal beef cubes',
      '1 cup red lentils',
      '1 cup cooked chickpeas',
      '1 onion, diced',
      '2 celery stalks, chopped',
      '1/2 cup tomato puree',
      '1 tsp ground turmeric',
      '1 tsp ground ginger',
      'Fresh cilantro and parsley',
    ],
    steps: [
      'Brown beef in a heavy pot with olive oil.',
      'Add onion, celery, and spices, cooking until fragrant.',
      'Stir in tomato puree, lentils, and chickpeas.',
      'Pour in 6 cups water, bring to a boil, then simmer for 45 minutes.',
      'Finish with chopped herbs and adjust seasoning.',
    ],
    category: 'soup',
    prepTime: 15,
    cookTime: 55,
    difficulty: 'easy',
    userId: 'seed-user-0003',
    averageRating: 4.5,
    status: 'approved',
  },
  {
    title: 'Creamy Butter Chicken',
    description:
      'Classic halal butter chicken with a silky tomato sauce enriched by cream and warm spices.',
    imageUrl:
      'https://images.unsplash.com/photo-1604908177225-d87ecf0b6d7e?auto=format&fit=crop&w=1200&q=80',
    ingredients: [
      '2 lb halal chicken breast, cubed',
      '1 cup yogurt',
      '3 tbsp butter',
      '1 can tomato puree',
      '1 cup heavy cream',
      '2 tsp garam masala',
      '1 tsp ground cumin',
      '1 tsp smoked paprika',
      'Fresh cilantro for garnish',
    ],
    steps: [
      'Marinate chicken in yogurt and spices for at least 1 hour.',
      'Sear chicken in butter until lightly charred and set aside.',
      'Simmer tomato puree with spices for 10 minutes.',
      'Return chicken to sauce, add cream, and cook until thickened.',
      'Garnish with cilantro and serve with naan or rice.',
    ],
    category: 'main-course',
    prepTime: 30,
    cookTime: 30,
    difficulty: 'medium',
    userId: 'seed-user-0002',
    averageRating: 4.9,
    status: 'approved',
  },
  {
    title: 'Falafel Pita Wraps',
    description:
      'Crispy chickpea falafel tucked into warm pita with herbs, vegetables, and tahini sauce.',
    imageUrl:
      'https://images.unsplash.com/photo-1604908177093-00be66b4b05d?auto=format&fit=crop&w=1200&q=80',
    ingredients: [
      '2 cups dried chickpeas, soaked',
      '1/2 onion, roughly chopped',
      '4 cloves garlic',
      '1 cup fresh parsley and cilantro',
      '2 tsp ground cumin',
      '1 tsp baking powder',
      'Pita bread',
      'Tomatoes, cucumbers, tahini sauce',
    ],
    steps: [
      'Pulse chickpeas, onion, herbs, and spices into a coarse mixture.',
      'Fold in baking powder and chill mixture for 30 minutes.',
      'Form falafel balls and fry until golden and crisp.',
      'Warm pita bread and prepare vegetables.',
      'Assemble wraps with falafel, vegetables, and tahini sauce.',
    ],
    category: 'appetizer',
    prepTime: 25,
    cookTime: 15,
    difficulty: 'medium',
    userId: 'seed-user-0001',
    averageRating: 4.4,
    status: 'approved',
  },
  {
    title: 'Beef Kofta Kebabs',
    description:
      'Juicy halal ground beef koftas grilled with Mediterranean spices and served with yogurt sauce.',
    imageUrl:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
    ingredients: [
      '1.5 lb halal ground beef',
      '1/2 onion, grated',
      '2 cloves garlic, minced',
      '1/4 cup chopped parsley',
      '1 tsp ground coriander',
      '1 tsp ground cumin',
      '1/2 tsp chili flakes',
      'Olive oil, salt, pepper',
    ],
    steps: [
      'Combine beef with onions, garlic, herbs, and spices.',
      'Form mixture onto skewers and chill for 20 minutes.',
      'Brush with olive oil and grill over medium heat for 10 minutes.',
      'Rest kebabs for 5 minutes.',
      'Serve with flatbread, yogurt sauce, and grilled vegetables.',
    ],
    category: 'main-course',
    prepTime: 20,
    cookTime: 15,
    difficulty: 'easy',
    userId: 'seed-user-0003',
    averageRating: 4.6,
    status: 'approved',
  },
  {
    title: 'Vegetable Samosas',
    description:
      'Golden fried pastries filled with spiced potatoes, peas, and carrots for a halal snack.',
    imageUrl:
      'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=1200&q=80',
    ingredients: [
      '2 cups potatoes, diced',
      '1 cup green peas',
      '1 carrot, diced',
      '1 onion, chopped',
      '2 tsp curry powder',
      'Samosa wrappers',
      'Vegetable oil for frying',
      'Salt and pepper',
    ],
    steps: [
      'Boil potatoes and carrots until tender, then drain.',
      'Sauté onions with curry powder until fragrant.',
      'Mix in potatoes, carrots, and peas, season to taste.',
      'Fill samosa wrappers with vegetable mixture and seal.',
      'Fry samosas until crispy and golden brown.',
    ],
    category: 'appetizer',
    prepTime: 25,
    cookTime: 20,
    difficulty: 'medium',
    userId: 'seed-user-0002',
    averageRating: 4.3,
    status: 'approved',
  },
  {
    title: 'Shish Tawook Skewers',
    description:
      'Lebanese-style halal chicken skewers marinated in yogurt, garlic, and citrus, grilled to perfection.',
    imageUrl:
      'https://images.unsplash.com/photo-1559847844-5315695dada6?auto=format&fit=crop&w=1200&q=80',
    ingredients: [
      '2 lb halal chicken breast, cubed',
      '1/2 cup yogurt',
      '4 cloves garlic, minced',
      '2 tbsp lemon juice',
      '1 tbsp tomato paste',
      '1 tsp smoked paprika',
      '1 tsp ground cumin',
      'Olive oil, salt, pepper',
    ],
    steps: [
      'Whisk yogurt, garlic, lemon juice, tomato paste, and spices.',
      'Marinate chicken cubes in mixture for at least 3 hours.',
      'Thread chicken onto skewers.',
      'Grill over medium-high heat, turning often, for 12 minutes.',
      'Serve with garlic sauce and warm pita.',
    ],
    category: 'main-course',
    prepTime: 20,
    cookTime: 12,
    difficulty: 'easy',
    userId: 'seed-user-0001',
    averageRating: 4.7,
    status: 'approved',
  },
  {
    title: 'Pistachio Kunafa',
    description:
      'Crisp kataifi pastry layered with sweet cheese and pistachios, soaked in fragrant syrup.',
    imageUrl:
      'https://images.unsplash.com/photo-1612874742286-29b23e7ceb8d?auto=format&fit=crop&w=1200&q=80',
    ingredients: [
      '1 lb kataifi pastry',
      '1/2 cup melted ghee',
      '2 cups sweet cheese or mozzarella',
      '1 cup finely chopped pistachios',
      '1 cup sugar',
      '1/2 cup water',
      '1 tbsp rose water',
      '1 tbsp lemon juice',
    ],
    steps: [
      'Brush kataifi pastry with melted ghee and press half into a greased baking pan.',
      'Layer cheese over pastry and top with remaining kataifi.',
      'Bake at 375°F (190°C) for 30 minutes until golden.',
      'Simmer sugar, water, and lemon juice to make syrup, then stir in rose water.',
      'Pour syrup over hot kunafa and garnish with pistachios.',
    ],
    category: 'dessert',
    prepTime: 25,
    cookTime: 30,
    difficulty: 'medium',
    userId: 'seed-user-0003',
    averageRating: 4.9,
    status: 'approved',
  },
];

async function seedHalalRecipes(): Promise<void> {
  const appContext = await NestFactory.createApplicationContext(AppModule);

  try {
    const recipeModel = appContext.get<Model<RecipeSchema>>(
      getModelToken(RecipeSchema.name),
    );

    for (const recipe of halalRecipes) {
      await recipeModel.updateOne(
        { title: recipe.title },
        { $set: recipe },
        { upsert: true },
      );
    }

    console.log(`Seeded ${halalRecipes.length} halal recipes.`);
  } catch (error) {
    console.error('Failed to seed halal recipes.', error);
    process.exitCode = 1;
  } finally {
    await appContext.close();
  }
}

void seedHalalRecipes();
