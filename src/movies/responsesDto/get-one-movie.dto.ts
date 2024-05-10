import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsString, IsUUID } from 'class-validator';

export class GetOneMovieResponseDTO {
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

  @IsString()
  @ApiProperty({ description: 'Description of the movie' })
  opening_crawl: string;

  @IsString()
  @ApiProperty({ description: 'Genre of the movie' })
  genre: string;

  @IsDate()
  @Type(() => Date)
  @ApiProperty({ type: Date, description: 'YYYY-MM-DD' })
  releaseDate: Date;

  @IsString()
  @ApiProperty({ description: 'Director of the movie' })
  director: string;

  @IsString()
  @ApiProperty({ description: 'Producer of the movie' })
  producer: string;

  @IsUUID()
  @ApiProperty({ description: 'user' })
  createdBy: string;
}
