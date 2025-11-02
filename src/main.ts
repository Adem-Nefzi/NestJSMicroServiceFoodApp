import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for Spring Boot communication
  app.enableCors();

  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`Application running on: http://localhost:${port}`);
}
void bootstrap();
