import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ImageKitService } from '../../infrastructure/services/imagekit.service';
import type { UploadedFile as UploadedFileType } from '../../common/types/uploaded-file.interface';

/**
 * Upload Controller - Handles image uploads
 */
@Controller('upload')
export class UploadController {
  constructor(
    private readonly imagekitService: ImageKitService,
    private readonly configService: ConfigService,
  ) {}

  @Post('recipe-image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadRecipeImage(
    @UploadedFile() file: UploadedFileType,
  ): Promise<{ imageUrl: string }> {
    if (!file || !file.mimetype || !file.size) {
      throw new BadRequestException('No image file provided');
    }

    // Validate file type (configurable via environment)
    const allowedTypesConfig = this.configService.get<string>(
      'ALLOWED_FILE_TYPES',
      'image/jpeg,image/png,image/webp',
    );
    const allowedMimeTypes = allowedTypesConfig.split(',').map((t) => t.trim());

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid file type. Allowed types: ${allowedMimeTypes.join(', ')}`,
      );
    }

    // Validate file size (configurable via environment, default 5MB)
    const maxSize = this.configService.get<number>(
      'MAX_FILE_SIZE',
      5 * 1024 * 1024,
    );
    if (file.size > maxSize) {
      const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1);
      throw new BadRequestException(`File size exceeds ${maxSizeMB}MB limit`);
    }

    const imageUrl = await this.imagekitService.uploadImage(file, 'recipes');

    return { imageUrl };
  }
}
