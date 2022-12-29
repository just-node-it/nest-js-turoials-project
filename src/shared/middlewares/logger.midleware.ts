import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: any) => void) {
    console.log(
      `${req.method} ${req.path} method was called from IP address: ${req.ip}`,
    );
    next();
  }
}
