import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class FindAnimalQueryDto {
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @IsOptional()
  classificationTree?: boolean;

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @IsOptional()
  parentsIncluded?: boolean;

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @IsOptional()
  childrenIncluded?: boolean;
}
