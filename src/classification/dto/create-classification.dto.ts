import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { AnimalClassificationEnum } from '../enums';

export class CreateClassificationDto {
  @IsString()
  @IsEnum(AnimalClassificationEnum)
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsOptional()
  parentCategoryId?: number;
}
