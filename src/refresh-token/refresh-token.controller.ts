import { RefreshTokenService } from './refresh-token.service';
import {
  Controller,
  Post,
  Req,
  Response,
  NotFoundException,
} from '@nestjs/common';

@Controller('refresh-token')
export class RefreshTokenController {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}

  @Post('/')
  async RefreshToken(@Req() req: any, @Response() res: any) {
    const { refresh_token } = req.body;
    try {
      const response = await this.refreshTokenService.GenerateNewToken(
        refresh_token,
      );

      return res.json(response);
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
