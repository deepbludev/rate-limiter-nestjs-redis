import { Module } from '@nestjs/common'
import { RateLimiterModule } from './rate-limiter/rate-limiter.module'
import { AppController } from './app.controller'
import { PublicRoutesModule } from './public-routes/public-routes.module'
import { PrivateRoutesModule } from './private-routes/private-routes.module'

@Module({
  imports: [RateLimiterModule, PublicRoutesModule, PrivateRoutesModule],
  controllers: [AppController],
})
export class AppModule {}
