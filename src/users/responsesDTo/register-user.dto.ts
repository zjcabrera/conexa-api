import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RegisterUserResponseDTO {
  @IsString()
  @ApiProperty({ description: 'Id of the user created' })
  id: string;
}
