import { Module } from '@nestjs/common';
import { RecipesModule } from './recipes/recipes.module.js';
import { PrismaService } from './prisma/prisma.service.js';
import { HealthController } from './health.controller.js';

@Module({
  imports: [RecipesModule],
  providers: [PrismaService],
  controllers: [HealthController],
})
export class AppModule {}