import { Module } from '@nestjs/common';
import { HealthCheckModule } from './health-check/health-check.module';
import { AuthModule } from './auth/auth.module';
import { MemberModule } from './member/member.module';

@Module({
  imports: [HealthCheckModule, AuthModule, MemberModule],
})
export class AppModule {}
