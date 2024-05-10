import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from '../services/auth.service';
import { AuthDTO } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() authBody: AuthDTO) {
    return await this.authService.validateUser(authBody);
  }
}
