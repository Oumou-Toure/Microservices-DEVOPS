import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RecipesService } from './recipes.service.js';
import { CreateFavoriteDto } from './dto/create-favorite.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { User } from '../auth/user.decorator.js';

@Controller('recipes')
@UseGuards(JwtAuthGuard)
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post('favorites')
  addFavorite(@User() user: any, @Body() dto: CreateFavoriteDto) {
    return this.recipesService.addFavorite(user.sub, dto);
  }

  @Get('favorites')
  getFavorites(@User() user: any) {
    return this.recipesService.getFavorites(user.sub);
  }

  @Delete('favorites/:id')
  removeFavorite(@Param('id', ParseIntPipe) id: number, @User() user: any) {
    return this.recipesService.removeFavorite(id, user.sub);
  }
}