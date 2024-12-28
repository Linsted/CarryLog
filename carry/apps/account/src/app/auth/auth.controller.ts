import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';

import { USER_ROLES } from '@carry/constants';

import { Auth0Guard } from './guards/auth.guard';
import { Roles } from './decorators/roles.decorator';
import { Public } from './decorators/public.decorator';

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
  redirect(@Req() req: Request, @Res() res: Response) {
    res.sendStatus(200);
  }

  @Get('status')
  @Roles(USER_ROLES.ADMIN)
  status(@Res() res: Response) {
    res.sendStatus(200);
  }
}
