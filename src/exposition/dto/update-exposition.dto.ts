import { IsOptional, IsString } from 'class-validator';

export class UpdateExpositionDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
