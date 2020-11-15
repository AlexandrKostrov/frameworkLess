/* eslint-disable class-methods-use-this */
import {
  Injectable, NestMiddleware, UnauthorizedException, UseFilters,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from './config/config.service';
import { HttpExceptionFilter } from './filters/httpException.filter';

@Injectable()
@UseFilters(new HttpExceptionFilter())
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly config: ConfigService) { }

  use(req: Request & { [key: string]: any }, res: Response, next: Function) {
    const token = req.header('x-auth-token');
    if (!token) throw new UnauthorizedException('No valid token provided');

    try {
      const decoded = jwt.verify(token, this.config.get('TOKEN_SECRET'));
      req.user = decoded;
      req.user.token = token;
      return next();
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
