import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';

import { USER_ROLES } from '@carry/constants';

import { Auth0Guard, AuthenticatedGuard } from './guards/auth.guard';
import { Roles } from './decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  @Get('login')
  @UseGuards(Auth0Guard)
  login() {
    return '';
  }

  @Get('redirect')
  @UseGuards(Auth0Guard)
  redirect(@Req() req: Request, @Res() res: Response) {
    console.log('User:', req.user);

    res.sendStatus(200);
  }

  @Get('status')
  @Roles(USER_ROLES.ADMIN)
  @UseGuards(AuthenticatedGuard)
  status(@Res() res: Response) {
    res.sendStatus(200);
  }
}
