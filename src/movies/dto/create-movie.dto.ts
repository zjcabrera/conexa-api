import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { UserEntity } from 'src/users/entities/user.entity';

export class CreateMovieDTO {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100) // Limita la longitud de 1 a 100 caracteres
  @ApiProperty({ description: 'Title of the movie' })
  title: string;

  @IsString()
  @IsOptional()
  @Length(0, 255) // Limita la longitud de 0 a 255 caracteres
  @ApiProperty({ description: 'Description of the movie' })
  opening_crawl: string;

  @IsDate()
  @Type(() => Date)
  @ApiProperty({ type: Date, description: 'YYYY-MM-DD' })
  releaseDate: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50) // Limita la longitud de 1 a 50 caracteres
  @ApiProperty({ description: 'Action, Adventure, Comedy, Drama, Horror, Mystery, Thriller, Western' })
  genre: string;

  @IsString()
  @IsOptional()
  @Length(1, 50) // Limita la longitud de 1 a 50 caracteres
  @ApiProperty({ description: 'Action, Adventure, Comedy, Drama, Horror, Mystery, Thriller, Western' })
  director: string;

  @IsString()
  @IsOptional()
  @Length(1, 50) // Limita la longitud de 1 a 50 caracteres
  @ApiProperty({ description: 'Action, Adventure, Comedy, Drama, Horror, Mystery, Thriller, Western' })
  producer: string;

  createdBy: UserEntity;
}
