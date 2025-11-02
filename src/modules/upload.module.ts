import { Module } from '@nestjs/common';
import { UploadController } from '../presentation/controllers/upload.controller';
import { ImageKitService } from '../infrastructure/services/imagekit.service';

@Module({
  controllers: [UploadController],
  providers: [ImageKitService],
  exports: [ImageKitService],
})
export class UploadModule {}
