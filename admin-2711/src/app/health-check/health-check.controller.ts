import { Controller, Get, Ip, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/authentication/guard/auth.guard';

@Controller('health-check')
export class HealthCheckController {
  @Get()
  @UseGuards(AuthGuard)
  async healthCheck(@Ip() ip) {
    return {
      result: 'OK',
      ip,
    };
  }
}
