import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class GetMoviesResponseDTO {
  @IsString()
  @ApiProperty({ description: 'Id of the movie' })
  id: string;

  @IsString()
  @ApiProperty({ description: 'Title of the movie' })
  title: string;

  @IsDate()
  @Type(() => Date)
  @ApiProperty({ type: Date, description: 'YYYY-MM-DD' })
  createdAt: Date;
}
