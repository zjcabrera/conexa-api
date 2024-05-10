import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { AuthService } from '../services/auth.service';
import { AuthDTO } from '../dto/auth.dto';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { LoginResponseDTO } from '../responsesDto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @ApiOkResponse({
    description: 'User successfully found.',
    type: LoginResponseDTO,
  })
  @Post('/login')
  async login(@Body() authBody: AuthDTO): Promise<LoginResponseDTO> {
    return await this.authService.validateUser(authBody);
  }
}
