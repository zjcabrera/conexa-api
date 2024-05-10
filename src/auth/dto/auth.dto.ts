import { IsNotEmpty, IsString } from 'class-validator';
import { IAuthBody } from '../interfaces/auth.interface';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDTO implements IAuthBody {
  @ApiProperty({
    description: 'The username of the user. It is required and should be a non-empty string.',
    example: 'johndoe123',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description:
      'The password of the user. It is required, must be a non-empty string, and should meet the security criteria for passwords.',
    example: 'Password123!',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
