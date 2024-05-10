import { PartialType } from '@nestjs/swagger';
import { CreateMovieDTO } from '.';

export class UpdateMovieDTO extends PartialType(CreateMovieDTO) {}
