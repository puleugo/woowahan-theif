import { Module } from '@nestjs/common';
import { HealthCheckModule } from './health-check/health-check.module';
import { AuthModule } from './auth/auth.module';
import { MemberModule } from './member/member.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceConfig } from './data-source';

@Module({
  imports: [
    HealthCheckModule,
    AuthModule,
    MemberModule,
    TypeOrmModule.forRoot(dataSourceConfig),
  ],
})
export class AppModule {}
