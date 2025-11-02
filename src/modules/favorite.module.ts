import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FavoriteSchema,
  FavoriteMongoSchema,
} from '../infrastructure/database/schemas/favorite.schema';
import { FavoriteRepository } from '../infrastructure/repositories/favorite.repository';
import { FavoriteUseCase } from '../application/use-cases/favorite.use-case';
import { FavoriteController } from '../presentation/controllers/favorite.controller';
import { IFavoriteRepository } from '../domain/repositories/favorite.repository.interface';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FavoriteSchema.name, schema: FavoriteMongoSchema },
    ]),
  ],
  controllers: [FavoriteController],
  providers: [
    FavoriteUseCase,
    {
      provide: 'IFavoriteRepository',
      useClass: FavoriteRepository,
    },
    {
      provide: FavoriteUseCase,
      useFactory: (repository: IFavoriteRepository) => {
        return new FavoriteUseCase(repository);
      },
      inject: ['IFavoriteRepository'],
    },
  ],
  exports: [FavoriteUseCase, 'IFavoriteRepository'],
})
export class FavoriteModule {}
