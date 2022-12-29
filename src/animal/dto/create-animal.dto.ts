import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateAnimalDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  age?: number;

  @IsString()
  @IsOptional()
  sex?: string;

  @IsString()
  @IsOptional()
  latinName?: string;

  @IsString()
  @IsNotEmpty()
  habitat: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  menu?: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  dateArrived: Date;

  @IsString()
  @IsOptional()
  photo?: string;

  @IsInt()
  @IsOptional()
  classificationId?: number;

  @IsInt()
  @IsOptional()
  employeeId?: number;

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  parents?: number[];

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  children?: number[];
}
