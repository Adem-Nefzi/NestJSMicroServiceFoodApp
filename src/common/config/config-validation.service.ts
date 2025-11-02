import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Configuration Validation Service
 * Validates that all required environment variables are set
 */
@Injectable()
export class ConfigValidationService {
  constructor(private configService: ConfigService) {}

  /**
   * Validates required environment variables
   * Throws error if any required variable is missing
   */
  validateConfig(): void {
    const requiredEnvVars = [
      'MONGODB_URI',
      'PORT',
      'IMAGEKIT_PUBLIC_KEY',
      'IMAGEKIT_PRIVATE_KEY',
      'IMAGEKIT_URL_ENDPOINT',
    ];

    const missingVars = requiredEnvVars.filter(
      (varName) => !this.configService.get(varName),
    );

    if (missingVars.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missingVars.join(', ')}`,
      );
    }

    // Validate MongoDB URI format
    const mongoUri = this.configService.get<string>('MONGODB_URI');
    if (mongoUri && !mongoUri.startsWith('mongodb')) {
      throw new Error('Invalid MONGODB_URI format');
    }

    // Validate ImageKit URL format
    const imagekitUrl = this.configService.get<string>('IMAGEKIT_URL_ENDPOINT');
    if (imagekitUrl && !imagekitUrl.startsWith('https://')) {
      throw new Error('IMAGEKIT_URL_ENDPOINT must use HTTPS');
    }

    console.log('✅ All required environment variables are configured');
  }

  /**
   * Get environment-specific settings
   */
  isProduction(): boolean {
    return this.configService.get<string>('NODE_ENV') === 'production';
  }

  isDevelopment(): boolean {
    return this.configService.get<string>('NODE_ENV') === 'development';
  }

  getPort(): number {
    return this.configService.get<number>('PORT') || 3001;
  }
}
