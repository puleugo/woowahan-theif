import { Module } from '@nestjs/common';
import { AppModule } from './src/app/app.module';
import { InfrastructureModule } from './src/infrastructure/infrastructure.module';

@Module({
  imports: [AppModule, InfrastructureModule],
})
export class MainModule {}
