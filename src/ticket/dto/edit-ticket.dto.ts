import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EditTicketDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  description?: string;
}
