import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.error('Unhandled Exception:', exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(500).send('Internal server error');
  }
}
