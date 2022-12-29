import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateExpositionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}
