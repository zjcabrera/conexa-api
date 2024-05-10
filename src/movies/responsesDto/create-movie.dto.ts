import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateMovieResponseDTO {
  @IsString()
  @ApiProperty({ description: 'Id of the movie created' })
  id: string;
}
