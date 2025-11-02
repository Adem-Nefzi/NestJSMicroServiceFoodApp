import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageKitService } from '../../infrastructure/services/imagekit.service';
import type { UploadedFile as UploadedFileType } from '../../common/types/uploaded-file.interface';

/**
 * Upload Controller - Handles image uploads
 */
@Controller('upload')
export class UploadController {
  constructor(private readonly imagekitService: ImageKitService) {}

  @Post('recipe-image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadRecipeImage(
    @UploadedFile() file: UploadedFileType,
  ): Promise<{ imageUrl: string }> {
    if (!file || !file.mimetype || !file.size) {
      throw new BadRequestException('No image file provided');
    }

    // Validate file type
    const allowedMimeTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
    ];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Invalid file type. Only JPEG, PNG, and WebP are allowed',
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      throw new BadRequestException('File size exceeds 5MB limit');
    }

    const imageUrl = await this.imagekitService.uploadImage(file, 'recipes');

    return { imageUrl };
  }
}
