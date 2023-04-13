import { Module } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [AppModule, InfrastructureModule],
})
export class MainModule {}
