import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() dto: RegisterUserDto): Promise<{ accessToken: string }> {
    return this.authService.register(dto);
  }

  @Post('login')
  loginUser(@Body() dto: LoginUserDto): Promise<{ accessToken: string }> {
    return this.authService.login(dto);
  }
}
