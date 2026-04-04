import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFavoriteDto {
  @IsString()
  @IsNotEmpty()
  mealId!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  thumbnail!: string;

  @IsString()
  @IsNotEmpty()
  category!: string;
}