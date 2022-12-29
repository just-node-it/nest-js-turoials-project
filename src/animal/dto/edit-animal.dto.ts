import { Type } from 'class-transformer';
import { IsDate, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class EditAnimalDto {
  @IsString()
  @IsOptional()
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
  @IsOptional()
  habitat: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  menu?: string;

  @IsOptional()
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
}
