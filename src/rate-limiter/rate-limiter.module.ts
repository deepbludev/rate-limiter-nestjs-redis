import * as redis from 'cache-manager-redis-store'
import { CacheModule, Module } from '@nestjs/common'
import { RateLimiterService } from './rate-limiter.service'

@Module({
  imports: [
    CacheModule.register({
      store: redis,
      socket: {
        host: 'localhost',
        port: 6379,
      },
      isGlobal: true,
    }),
  ],
  providers: [RateLimiterService],
  exports: [RateLimiterService],
})
export class RateLimiterModule {}
