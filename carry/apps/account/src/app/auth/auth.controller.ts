import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';

import { ENVIRONMENT, TIME, USER_ROLES } from '@carry/constants';

import { Auth0Guard } from './guards/auth.guard';
import { Roles } from './decorators/roles.decorator';
import { Public } from './decorators/public.decorator';
import { IRequestWithToken } from './interfaces/request.interface';

@Controller('auth')
export class AuthController {
  @Get('login')
  @Public()
  @UseGuards(Auth0Guard)
  login() {
    return '';
  }

  @Get('redirect')
  @Public()
  @UseGuards(Auth0Guard)
  redirect(@Req() req: IRequestWithToken, @Res() res: Response) {
    const token = req.user.token;

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === ENVIRONMENT.PROD,
      maxAge: TIME.ONE_DAY_IN_MS,
    });

    res.redirect('/');
  }

  @Get('status')
  @Roles(USER_ROLES.ADMIN)
  status(@Res() res: Response) {
    res.sendStatus(200);
  }
}
