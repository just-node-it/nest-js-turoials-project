import { Type } from 'class-transformer';
import { IsDate, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateEventDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startAt: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endAt: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  maxVisitorsNumber: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  registeredVisitorsNumber = 0; // fool class validator to set default value
}
