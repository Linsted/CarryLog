import { Controller, Get, Req } from '@nestjs/common';

import { IRequestWithUserUnknown } from '@carry/interfaces';

@Controller('order')
export class OrderController {
  @Get()
  getOrders(@Req() req: IRequestWithUserUnknown) {
    return req.user;
  }
}
