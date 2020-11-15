import { Body, Controller, Post, Req, UseFilters } from '@nestjs/common';
import { Request } from 'express';
import { ErrorFilter } from '../filters/httpException.filter';
import { AuthUserDto } from './auth-user.dto';
import * as crypto from 'crypto';
import { UserService } from '../user/user.service';

@UseFilters(ErrorFilter)
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) { }

  @Post('users')
  async authUser(@Body() { password, username }: AuthUserDto) {
    console.log(username);
    const passwordHash = crypto.createHash('sha1').update(password).digest('hex');
    const userInfo = await this.userService.getAgent(username, []);

    console.log(userInfo);

  }
}

