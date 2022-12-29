import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { AnimalClassificationEnum } from '../enums';

export class UpdateClassificationDto {
  @IsString()
  @IsEnum(AnimalClassificationEnum)
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsInt()
  @IsOptional()
  parentCategoryId?: number;
}
