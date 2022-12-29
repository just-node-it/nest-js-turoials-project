import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @ValidateIf((o) => !o.username)
  @IsNotEmpty()
  email: string;

  @IsString()
  @ValidateIf((o) => !o.email)
  @MinLength(4)
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
