import { Controller, Get, Request, Route, SuccessResponse } from 'tsoa';
import { User } from '../types/users';

@Route('tokenInfo')
export class TokenController extends Controller {
  @Get()
  @SuccessResponse('200, OK')
  public async getTokenInfo(@Request() req: any): Promise<User | void> {
    if (req.user) {
      this.setStatus(200);
      return req.user;
    } else {
      this.setStatus(204);
    }
  }
}
