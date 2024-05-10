import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDTO {
  @ApiProperty({
    description: 'Users email address. It must be a valid email with length between 1 and 100 characters.',
    example: 'juan.perez@example.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Length(1, 100)
  email: string;

  @ApiProperty({
    description: 'Username. It must be between 1 and 50 characters long.',
    example: 'juan123',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  username: string;

  @ApiProperty({
    description: 'JWT Access token',
    example: 'juan123',
  })
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}
