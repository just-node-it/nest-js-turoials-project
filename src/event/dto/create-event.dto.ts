import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  startAt: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  endAt: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  maxVisitorsNumber: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  registeredVisitorsNumber = 0; // fool class validator to set default value
}
