import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

class OrderItem {
  @IsNumber()
  @IsNotEmpty()
  ticketId: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItem)
  @IsNotEmpty()
  orderItems: OrderItem[];

  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsString()
  @IsNotEmpty()
  customerSurname: string;

  @IsEmail()
  @IsNotEmpty()
  customerEmail: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  reservationDay: Date;
}
