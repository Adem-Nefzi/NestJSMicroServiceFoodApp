import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import ImageKit from 'imagekit';
import { UploadedFile } from '../../common/types/uploaded-file.interface';

/**
 * ImageKit Service - Infrastructure Layer
 * Handles image upload and management with ImageKit.io
 */
@Injectable()
export class ImageKitService {
  private imagekit: ImageKit;

  constructor(private configService: ConfigService) {
    this.imagekit = new ImageKit({
      publicKey: this.configService.get<string>('IMAGEKIT_PUBLIC_KEY'),
      privateKey: this.configService.get<string>('IMAGEKIT_PRIVATE_KEY'),
      urlEndpoint: this.configService.get<string>('IMAGEKIT_URL_ENDPOINT'),
    });
  }

  /**
   * Upload image to ImageKit
   * @param file - File buffer
   * @param fileName - Original file name
   * @param folder - Folder path in ImageKit (e.g., 'recipes')
   * @returns Image URL
   */
  async uploadImage(
    file: UploadedFile,
    folder: string = 'recipes',
  ): Promise<string> {
    if (!file || !file.buffer || !file.originalname) {
      throw new Error('Invalid file object');
    }

    try {
      const result = await this.imagekit.upload({
        file: file.buffer.toString('base64'),
        fileName: `${Date.now()}_${file.originalname}`,
        folder: folder,
        useUniqueFileName: true,
        tags: ['recipe', 'food'],
      });

      return result.url;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to upload image: ${errorMessage}`);
    }
  }

  /**
   * Delete image from ImageKit
   * @param fileId - ImageKit file ID
   */
  async deleteImage(fileId: string): Promise<void> {
    try {
      await this.imagekit.deleteFile(fileId);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to delete image: ${errorMessage}`);
    }
  }

  /**
   * Get optimized image URL with transformations
   * @param url - Original ImageKit URL
   * @param width - Target width
   * @param height - Target height
   * @returns Transformed URL
   */
  getOptimizedUrl(url: string, width?: number, height?: number): string {
    const transformations: string[] = [];

    if (width) transformations.push(`w-${width}`);
    if (height) transformations.push(`h-${height}`);
    transformations.push('f-auto'); // Auto format (WebP for supported browsers)
    transformations.push('q-80'); // Quality 80%

    if (transformations.length > 0) {
      return url.replace(
        '/upload/',
        `/upload/tr:${transformations.join(',')}/`,
      );
    }

    return url;
  }
}
