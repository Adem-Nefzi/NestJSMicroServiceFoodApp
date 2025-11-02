import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CommentSchema,
  CommentMongoSchema,
} from '../infrastructure/database/schemas/comment.schema';
import { CommentRepository } from '../infrastructure/repositories/comment.repository';
import { CommentUseCase } from '../application/use-cases/comment.use-case';
import { CommentController } from '../presentation/controllers/comment.controller';
import { ICommentRepository } from '../domain/repositories/comment.repository.interface';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CommentSchema.name, schema: CommentMongoSchema },
    ]),
  ],
  controllers: [CommentController],
  providers: [
    CommentUseCase,
    {
      provide: 'ICommentRepository',
      useClass: CommentRepository,
    },
    {
      provide: CommentUseCase,
      useFactory: (repository: ICommentRepository) => {
        return new CommentUseCase(repository);
      },
      inject: ['ICommentRepository'],
    },
  ],
  exports: [CommentUseCase, 'ICommentRepository'],
})
export class CommentModule {}
