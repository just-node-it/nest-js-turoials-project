import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class FindAnimalsQueryDto {
  @IsString()
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sort?: string;

  @IsObject()
  @IsOptional()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Age)
  age?: object;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  parentId?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  classificationId?: number;

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @IsOptional()
  photo?: boolean;

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @IsOptional()
  parentsIncluded?: boolean;

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @IsOptional()
  childrenIncluded?: boolean;
}

class Age {
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @IsOptional()
  lte?: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @IsOptional()
  gte?: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @IsOptional()
  lt?: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @IsOptional()
  gt?: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @IsOptional()
  equals?: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @IsOptional()
  not?: number;
}
