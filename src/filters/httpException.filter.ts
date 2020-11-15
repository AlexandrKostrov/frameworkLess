import {
  ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as Sentry from '@sentry/node';

interface CustomResponse {
  statusCode: number,
  error: string,
  message: string
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        message: exception.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}



export class ErrorFilter implements ExceptionFilter {
  catch(exception: Error & HttpException, host: ArgumentsHost) {
    Sentry.captureException(exception.stack);
    console.log(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception instanceof HttpException
      ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception instanceof HttpException
      ? exception.message : 'Something unexpected went wrong.';


    const resp: CustomResponse = exception?.getResponse() as unknown as CustomResponse;

    response.status(status).send({
      statusCode: resp.statusCode,
      message: resp.message[0],
      error: resp.error
    });
  }
}


