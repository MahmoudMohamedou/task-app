import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Cause } from 'src/middlewares/authenticate-user/authenticate-user.middleware';

@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: (exception.getResponse() as any).message,
      name:
        exception.cause === Cause.SESSION_EXPIRED
          ? Cause.SESSION_EXPIRED
          : exception.name,
      path: request.url,
    });
  }
}
