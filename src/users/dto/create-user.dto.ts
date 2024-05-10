import { IsEmail, IsNotEmpty, IsString, Matches, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoleEntity } from 'src/roles/entities';

export class CreateUserDTO {
  @ApiProperty({
    description: 'Primer nombre del usuario. Debe tener una longitud entre 1 y 50 caracteres.',
    example: 'Juan',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  firstName: string;

  @ApiProperty({
    description: 'Apellido del usuario. Debe tener una longitud entre 1 y 50 caracteres.',
    example: 'Pérez',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  lastName: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario. Debe ser un email válido con longitud entre 1 y 100 caracteres.',
    example: 'juan.perez@example.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Length(1, 100)
  email: string;

  @ApiProperty({
    description: 'Nombre de usuario. Debe tener una longitud entre 1 y 50 caracteres.',
    example: 'juan123',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  username: string;

  @ApiProperty({
    description:
      'Contraseña del usuario. Debe tener una longitud entre 8 y 15 caracteres y contener al menos una letra minúscula, una mayúscula, un número y un carácter especial.',
    example: 'Password123!',
  })
  @IsString()
  @IsNotEmpty()
  @Length(8, 15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/, {
    message:
      'La contraseña debe incluir al menos una letra minúscula, una mayúscula, un número y un carácter especial, y tener entre 8 y 15 caracteres de longitud.',
  })
  password: string;

  role: RoleEntity;
}
