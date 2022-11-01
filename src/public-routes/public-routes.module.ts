import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { RateLimiterModule } from '../rate-limiter/rate-limiter.module'
import { PublicRoutesController } from './public-routes.controller'
import { PublicRateLimiterMiddleware } from './public.rate-limiter.middleware'

@Module({
  imports: [RateLimiterModule],
  controllers: [PublicRoutesController],
})
export class PublicRoutesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PublicRateLimiterMiddleware).forRoutes('public')
  }
}
