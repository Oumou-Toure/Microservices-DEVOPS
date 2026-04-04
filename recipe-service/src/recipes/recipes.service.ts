import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateFavoriteDto } from './dto/create-favorite.dto.js';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  async addFavorite(user: string, dto: CreateFavoriteDto) {
    try {
      return await this.prisma.favorite.create({
        data: {
          user,
          mealId: dto.mealId,
          name: dto.name,
          thumbnail: dto.thumbnail,
          category: dto.category,
        },
      });
    } catch {
      throw new ConflictException('Already in favorites');
    }
  }

  getFavorites(user: string) {
    return this.prisma.favorite.findMany({
      where: { user },
      orderBy: { createdAt: 'desc' },
    });
  }

  removeFavorite(id: number, user: string) {
    return this.prisma.favorite.deleteMany({
      where: { id, user },
    });
  }
}