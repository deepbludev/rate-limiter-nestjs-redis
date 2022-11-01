import { Module } from '@nestjs/common'
import { RateLimiterModule } from './rate-limiter/rate-limiter.module'
import { AppController } from './app.controller'

@Module({
  imports: [RateLimiterModule],
  controllers: [AppController],
})
export class AppModule {}
