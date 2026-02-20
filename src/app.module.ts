import { Module } from '@nestjs/common';
import { CronModule } from './cron/cron.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [CronModule, LoggerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
