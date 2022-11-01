import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { RateLimiterModule } from '../rate-limiter/rate-limiter.module'
import { PrivateRoutesController } from './private-routes.controller'
import { AuthMiddleware } from './auth.middleware'
import { PrivateRateLimiterMiddleware } from './private.rate-limiter.middleware'
import { AuthService } from './auth.service'

@Module({
  imports: [RateLimiterModule],
  controllers: [PrivateRoutesController],
  providers: [AuthService],
})
export class PrivateRoutesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware, PrivateRateLimiterMiddleware)
      .forRoutes('private')
  }
}
