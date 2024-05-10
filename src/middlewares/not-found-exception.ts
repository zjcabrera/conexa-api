import { Catch, ExceptionFilter, HttpStatus, NotFoundException } from '@nestjs/common';
import { ArgumentsHost } from '@nestjs/common/interfaces/features/arguments-host.interface';

@Catch(NotFoundException)
export class MethodNotAllowedExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // Devuelve `405 Method Not Allowed` si la ruta no existe
    response.status(HttpStatus.METHOD_NOT_ALLOWED).json({
      statusCode: HttpStatus.METHOD_NOT_ALLOWED,
      message: 'Method Not Allowed',
    });
  }
}
