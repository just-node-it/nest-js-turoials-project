import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    switch (exception.code) {
      case 'P2002': {
        response.status(HttpStatus.CONFLICT).json({ message: 'Conflict' });
        break;
      }
      case 'P2025': {
        response
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Resource was not found' });

        break;
      }
      case 'P2003': {
        response
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'Foreign key constraint failed' });
        break;
      }
      case 'P2018': {
        response
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'The required connected records were not found.' });
        break;
      }
    }
  }
}
