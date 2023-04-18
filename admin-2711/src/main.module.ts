import { Module } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceConfig } from './app/data-source';

@Module({
  imports: [
    AppModule,
    InfrastructureModule,
    TypeOrmModule.forRoot(dataSourceConfig),
  ],
})
export class MainModule {}
